import {test} from 'node:test';
import assert from 'node:assert/strict';
import {countLeaveDays} from '../lib/staff/leave-days.ts';

test('Sundays are free; Saturdays count', () => {
  assert.equal(countLeaveDays('2026-09-19', '2026-09-21'), 2);
  assert.equal(countLeaveDays('2026-09-20', '2026-09-20'), 0);
  assert.equal(countLeaveDays('2026-09-19', '2026-09-19'), 1);
  assert.equal(countLeaveDays('2026-09-21', '2026-09-27'), 6);
  assert.equal(countLeaveDays('2026-09-20', '2026-10-04'), 12);
});
test('handles month, year, leap-day and invalid boundaries', () => {
  assert.equal(countLeaveDays('2026-01-31', '2026-02-02'), 2);
  assert.equal(countLeaveDays('2026-12-31', '2027-01-04'), 4);
  assert.equal(countLeaveDays('2028-02-28', '2028-03-01'), 3);
  assert.equal(countLeaveDays('2026-02-30', '2026-03-02'), 0);
  assert.equal(countLeaveDays('2026-09-22', '2026-09-21'), 0);
});
