import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const source = readFileSync('atomicttv/atomicttv.user.js', 'utf8');
const startAt = source.indexOf('    function startAdManagerDecline() {');
const stopAt = source.indexOf('\n    function startOverlayAdWatch() {', startAt);
assert.ok(startAt >= 0 && stopAt > startAt, 'ad manager watchdog must be present');

// Exercise the real production scheduler, with deterministic clocks and no Twitch network calls.
function makeHarness({ initialActive = false, attemptsLimit = 3 } = {}) {
  let working = initialActive;
  const tasks = [];
  const logs = [];
  const adManager = {
    applied: false, attempts: 0, recoveries: 0, reason: null,
    moduleId: null, lastHealthyAt: null,
  };
  const date = { now: () => 100000 };
  const scheduler = (fn, delay) => { tasks.push({ fn, delay }); return tasks.length; };
  const factory = new Function(
    'Config', 'AdManager', 'AD_DECLINE_ATTEMPTS', 'AD_DECLINE_RECHECK_MS',
    'declineClientSideAds', 'log', 'setTimeout', 'Date',
    source.slice(startAt, stopAt) + '\nreturn startAdManagerDecline;'
  );
  const enable = factory(
    { DeclineClientSideAds: true },
    adManager, attemptsLimit, 30000,
    () => working,
    (level, message) => logs.push({ level, message }),
    scheduler,
    date,
  );
  return {
    enable, tasks, logs, adManager,
    setWorking: (value) => { working = value; },
    advance() {
      const task = tasks.shift();
      assert.ok(task, 'expected a scheduled recheck');
      task.fn();
      return task.delay;
    },
  };
}

test('discovery keeps probing slowly after startup budget expires', () => {
  const h = makeHarness({ attemptsLimit: 3 });
  h.enable();
  assert.equal(h.adManager.attempts, 1);
  assert.equal(h.tasks[0].delay, 500);
  h.advance();
  assert.equal(h.tasks[0].delay, 500);
  h.advance();
  assert.equal(h.adManager.attempts, 3);
  assert.equal(h.tasks[0].delay, 30000);
  assert.match(h.logs.map(x => x.message).join('\n'), /continuing checks every 30s/);
  h.setWorking(true);
  h.advance();
  assert.equal(h.adManager.applied, true);
  assert.equal(h.adManager.attempts, 4);
  assert.equal(h.adManager.recoveries, 1);
  assert.equal(h.adManager.lastHealthyAt, 100000);
  assert.equal(h.tasks[0].delay, 30000);
});

test('decline state is revalidated after initial success, not frozen forever', () => {
  const h = makeHarness({ initialActive: true, attemptsLimit: 3 });
  h.enable();
  assert.equal(h.adManager.applied, true);
  assert.equal(h.tasks[0].delay, 30000);
  h.setWorking(false);
  h.advance();
  assert.equal(h.adManager.applied, false);
  assert.equal(h.tasks[0].delay, 500);
  assert.match(h.logs.map(x => x.message).join('\n'), /protection lost/);
  h.setWorking(true);
  h.advance();
  assert.equal(h.adManager.applied, true);
  assert.equal(h.adManager.recoveries, 1);
});

test('watchdog stays disabled when client-side ad filtering is off', () => {
  const h = makeHarness();
  const factory = new Function(
    'Config', 'AdManager', 'AD_DECLINE_ATTEMPTS', 'AD_DECLINE_RECHECK_MS',
    'declineClientSideAds', 'log', 'setTimeout', 'Date',
    source.slice(startAt, stopAt) + '\nreturn startAdManagerDecline;'
  );
  factory({ DeclineClientSideAds: false }, h.adManager, 3, 30000,
    () => false, () => {}, () => { throw new Error('Unexpected retry'); },
    { now: () => 100000 })();
  assert.equal(h.adManager.attempts, 0);
});
