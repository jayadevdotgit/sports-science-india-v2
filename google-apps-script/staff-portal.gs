/** Add as a second Apps Script file beside booking-sheet.gs.
 * Uses the existing SHEET_ID, SHARED_TOKEN and doPost script lock.
 * Staff records are stored in readable columns in the Staff_* tabs.
 */
const STAFF_APPROVER = 'sportsscienceindia.office@gmail.com';

const STAFF_HEADERS = {
  Auth: ['Email', 'Hash', 'Expires (ms)', 'Attempts', 'Sent At (ms)', 'Sent At (IST)', 'Window Start (ms)', 'Window Start (IST)', 'Sent'],
  Attendance: ['ID', 'Email', 'Day', 'Check In', 'Check Out'],
  Leave: ['ID', 'Email', 'Type', 'Start', 'End', 'Days', 'Reason', 'Status', 'Created', 'Reviewed By', 'Reviewed At']
};
function staffTable_(name) {
  const book = SpreadsheetApp.openById(SHEET_ID);
  let sheet = book.getSheetByName('Staff_' + name);
  if (!sheet) sheet = book.insertSheet('Staff_' + name);
  const headers = STAFF_HEADERS[name] || ['ID', 'Record JSON'];
  if (sheet.getLastRow() === 0) sheet.appendRow(headers);
  // Migrate the earlier two-column JSON format into readable columns once.
  if (sheet.getLastColumn() === 2 && sheet.getRange(1, 2).getDisplayValue() === 'Record JSON' && STAFF_HEADERS[name]) {
    const old = sheet.getLastRow() > 1 ? sheet.getRange(2, 2, sheet.getLastRow() - 1, 1).getDisplayValues() : [];
    const records = old.filter(function(row) { return row[0]; }).map(function(row) { return JSON.parse(row[0]); });
    sheet.clearContents(); sheet.appendRow(STAFF_HEADERS[name]);
    records.forEach(function(record) { staffPut_(name, record.id || record.email, record); });
  }
  if (name === 'Auth' && sheet.getLastColumn() === 7 && sheet.getRange(1, 5).getDisplayValue() === 'Sent At') {
    const old = sheet.getLastRow() > 1 ? sheet.getRange(2, 1, sheet.getLastRow() - 1, 7).getDisplayValues() : [];
    const records = old.filter(function(row) { return row[0]; }).map(function(row) {
      return {email: row[0], hash: row[1], expires: Number(row[2]), attempts: Number(row[3]), sentAt: Number(row[4]), windowStart: Number(row[5]), sent: Number(row[6])};
    });
    sheet.clearContents(); sheet.appendRow(STAFF_HEADERS.Auth);
    records.forEach(function(record) { staffPut_('Auth', record.email, record); });
  }
  if (name === 'Attendance' && sheet.getLastRow() > 1) {
    const rows = sheet.getRange(2, 1, sheet.getLastRow() - 1, 5).getValues();
    rows.forEach(function(row, index) {
      ['3', '4'].forEach(function(column) {
        const value = row[Number(column)];
        if (value && String(value).indexOf(':') >= 0 && String(value).indexOf('T') >= 0) {
          const parsed = new Date(value);
          if (!isNaN(parsed.getTime())) sheet.getRange(index + 2, Number(column) + 1).setNumberFormat('@').setValue(Utilities.formatDate(parsed, 'Asia/Kolkata', 'hh:mm a'));
        }
      });
    });
  }
  if (name === 'Leave' && sheet.getLastRow() > 1) {
    const rows = sheet.getRange(2, 1, sheet.getLastRow() - 1, 11).getValues();
    rows.forEach(function(row, index) {
      [8, 10].forEach(function(column) {
        const value = row[column];
        if (value && String(value).indexOf('T') >= 0) {
          const parsed = new Date(value);
          if (!isNaN(parsed.getTime())) sheet.getRange(index + 2, column + 1).setNumberFormat('@').setValue(Utilities.formatDate(parsed, 'Asia/Kolkata', 'yyyy-MM-dd hh:mm a'));
        }
      });
    });
  }
  return sheet;
}
function staffRows_(name) {
  const sheet = staffTable_(name);
  if (sheet.getLastRow() < 2) return [];
  const headers = STAFF_HEADERS[name] || ['ID', 'Record JSON'];
  return sheet.getRange(2, 1, sheet.getLastRow() - 1, headers.length).getDisplayValues()
    .filter(function(row) { return row.some(function(value) { return value !== ''; }); })
    .map(function(row) {
      const record = {};
      headers.forEach(function(header, index) { record[header] = row[index]; });
      if (name === 'Auth') return {email: record['Email'], hash: record['Hash'], expires: Number(record['Expires (ms)']), attempts: Number(record['Attempts']), sentAt: Number(record['Sent At (ms)']), windowStart: Number(record['Window Start (ms)']), sent: Number(record['Sent'])};
      if (name === 'Attendance') return {id: record['ID'], email: record['Email'], day: record['Day'], check_in: record['Check In'], check_out: record['Check Out'] || null};
      if (name === 'Leave') return {id: record['ID'], email: record['Email'], type: record['Type'], start: record['Start'], end: record['End'], days: Number(record['Days']) || 0, reason: record['Reason'], status: record['Status'], created: record['Created'], reviewed_by: record['Reviewed By'], reviewed_at: record['Reviewed At']};
      return record;
    });
}
function staffPut_(name, id, record) {
  const sheet = staffTable_(name);
  const headers = STAFF_HEADERS[name] || ['ID', 'Record JSON'];
  const rows = sheet.getLastRow() > 1 ? sheet.getRange(2, 1, sheet.getLastRow() - 1, headers.length).getDisplayValues() : [];
  const idIndex = name === 'Auth' ? 0 : 0;
  const position = rows.findIndex(function(row) { return row[idIndex] === (name === 'Auth' ? record.email : id); });
  let values;
  if (name === 'Auth') values = [record.email, record.hash, record.expires, record.attempts, record.sentAt, record.sentAt ? Utilities.formatDate(new Date(record.sentAt), 'Asia/Kolkata', 'yyyy-MM-dd hh:mm a') : '', record.windowStart, record.windowStart ? Utilities.formatDate(new Date(record.windowStart), 'Asia/Kolkata', 'yyyy-MM-dd hh:mm a') : '', record.sent];
  else if (name === 'Attendance') values = [record.id, record.email, record.day, record.check_in, record.check_out || ''];
  else if (name === 'Leave') values = [record.id, record.email, record.type, record.start, record.end, record.days, record.reason, record.status, record.created, record.reviewed_by || '', record.reviewed_at || ''];
  else values = [id, JSON.stringify(record)];
  sheet.getRange(position < 0 ? sheet.getLastRow() + 1 : position + 2, 1, 1, values.length).setNumberFormat('@').setValues([values]);
}
function staffDirectory_() {
  const book = SpreadsheetApp.openById(SHEET_ID);
  let sheet = book.getSheetByName('Staff');
  if (!sheet) sheet = book.insertSheet('Staff');
  if (sheet.getLastRow() === 0) sheet.appendRow(['Name', 'Email', 'Role', 'Quota (legacy)', 'Active', 'Joining Date']);
  sheet.getRange(1, 6).setValue('Joining Date');
  if (sheet.getLastRow() < 2) return [];
  const joiningDates = sheet.getRange(2, 6, sheet.getLastRow() - 1, 1).getValues();
  return sheet.getRange(2, 1, sheet.getLastRow() - 1, 6).getDisplayValues()
    .map(function(row,index) {
      const value = joiningDates[index][0];
      if (value instanceof Date && !isNaN(value.getTime())) row[5] = Utilities.formatDate(value, book.getSpreadsheetTimeZone(), 'yyyy-MM-dd');
      return row;
    })
    .filter(function(row) { return row[1]; })
    .map(function(row) {
      return {name: row[0], email: row[1].trim().toLowerCase(), role: row[2] || 'staff', quota: Number(row[3]) || 0, joiningDate: row[5] || '',
        active: !['no', 'false', '0', 'inactive'].includes(String(row[4]).trim().toLowerCase())};
    });
}
function staffSavePerson_(person) {
  const book = SpreadsheetApp.openById(SHEET_ID);
  const sheet = book.getSheetByName('Staff') || book.insertSheet('Staff');
  if (sheet.getLastRow() === 0) sheet.appendRow(['Name', 'Email', 'Role', 'Quota (legacy)', 'Active', 'Joining Date']);
  const rows = sheet.getLastRow() > 1 ? sheet.getRange(2, 1, sheet.getLastRow() - 1, 5).getDisplayValues() : [];
  const index = rows.findIndex(function(row) { return row[1].trim().toLowerCase() === (person.originalEmail || person.email); });
  sheet.getRange(1, 6).setValue('Joining Date');
  const previousDate = index < 0 ? '' : sheet.getRange(index + 2, 6).getDisplayValue();
  const values = [[person.name, person.email, person.role, person.quota || 0, person.active ? 'Yes' : 'No', person.joiningDate === undefined ? previousDate : person.joiningDate]];
  sheet.getRange(index < 0 ? sheet.getLastRow() + 1 : index + 2, 1, 1, 6).setNumberFormat('@').setValues(values);
}
function staffError_(message, status) {
  const error = new Error(message); error.status = status || 400; throw error;
}
function staffDateValid_(value) {
  return typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value) &&
    isFinite(Date.parse(value)) && new Date(value).toISOString().slice(0, 10) === value;
}
function staffDays_(start, end) {
  if (!staffDateValid_(start) || !staffDateValid_(end) || end < start) return 0;
  const first = new Date(start + 'T00:00:00Z');
  const total = Math.round((Date.parse(end) - first.getTime()) / 86400000) + 1;
  const firstSunday = (7 - first.getUTCDay()) % 7;
  return total - (firstSunday < total ? Math.floor((total - 1 - firstSunday) / 7) + 1 : 0);
}
function staffDispatch_(p) {
  try { return Object.assign({ok: true, staffVersion: 1}, staffOperation_(p)); }
  catch (error) { return {ok: false, staffVersion: 1, error: error.message || 'Unable to access staff records', status: error.status || 503}; }
}
function staffOperation_(p) {
  const now = new Date();
  const nowTime = Utilities.formatDate(now, 'Asia/Kolkata', 'hh:mm a');
  const today = Utilities.formatDate(now, 'Asia/Kolkata', 'yyyy-MM-dd');
  const people = staffDirectory_();
  if (!people.some(function(person) { return person.email === STAFF_APPROVER; })) {
    const office = {email: STAFF_APPROVER, name: 'SSI Office', role: 'admin', quota: 0};
    office.active = true; staffSavePerson_(office); people.push(office);
  }

  if (p.operation === 'auth_request' || p.operation === 'auth_verify') {
    if (typeof p.email !== 'string' || typeof p.hash !== 'string' || p.hash.length > 100) staffError_('Invalid sign-in request');
    const person = people.find(function(row) { return row.email === p.email; });
    const challenges = staffRows_('Auth');
    const challenge = challenges.find(function(row) { return row.email === p.email; });
    if (p.operation === 'auth_request') {
      // Avoid revealing whether an email exists and cap delivery per account.
    if (!person || !person.active) return {send: false};
      if (challenge && now.getTime() - challenge.sentAt < 60000) return {send: false};
      const withinWindow = challenge && now.getTime() - challenge.windowStart < 3600000;
      const sent = withinWindow ? challenge.sent : 0;
      if (sent >= 5) return {send: false};
      staffPut_('Auth', p.email, {email: p.email, hash: p.hash, expires: now.getTime() + 600000,
        attempts: 0, sentAt: now.getTime(), windowStart: withinWindow ? challenge.windowStart : now.getTime(), sent: sent + 1});
      return {send: true};
    }
    if (!person || !person.active || !challenge || !challenge.hash || challenge.expires <= now.getTime() || challenge.attempts >= 5) staffError_('Invalid or expired sign-in code.', 401);
    challenge.attempts += 1;
    const valid = challenge.hash === p.hash;
    if (valid) { challenge.hash = ''; challenge.expires = 0; }
    staffPut_('Auth', p.email, challenge);
    if (!valid) staffError_('Invalid or expired sign-in code.', 401);
    return {verified: true};
  }

  const me = people.find(function(row) { return row.email === p.actor; });
  if (!me || !me.active) staffError_('Your email is not registered or is inactive. Contact the office administrator.', 403);
  const admin = me.email === STAFF_APPROVER;
  me.role = admin ? 'admin' : 'staff';
  const attendance = staffRows_('Attendance');
  const leave = staffRows_('Leave').map(function(row) {
    // Old records also follow the current Sunday policy; balances cannot retain Sunday charges.
    row.days = staffDays_(row.start, row.end); return row;
  });
  if (p.operation === 'read') {
    return {me: me, today: today, policyVersion: 2, leavePolicy: staffLeavePolicy_(me, leave, today),
      people: admin ? people.map(function(person) { return Object.assign({}, person, {role: person.email === STAFF_APPROVER ? 'admin' : 'staff'}); }) : [me],
      attendance: attendance.filter(function(row) { return admin || row.email === me.email; }).sort(function(a,b) { return b.day.localeCompare(a.day); }).slice(0,1000),
      leave: leave.filter(function(row) { return admin || row.email === me.email; }).sort(function(a,b) { return b.created.localeCompare(a.created); })};
  }
  if (p.operation === 'checkin') {
    if (attendance.some(function(row) { return row.email === me.email && row.day === today; })) staffError_('You have already checked in today.');
    const record = {id: Utilities.getUuid(), email: me.email, day: today, check_in: nowTime, check_out: null};
    staffPut_('Attendance', record.id, record); return {attendanceRecord: record};
  }
  if (p.operation === 'checkout') {
    const record = attendance.find(function(row) { return row.email === me.email && row.day === today && !row.check_out; });
    if (!record) staffError_('No active check-in today.');
    record.check_out = nowTime; staffPut_('Attendance', record.id, record); return {attendanceRecord: record};
  }
  if (p.operation === 'leave') {
    if (['Casual Leave (CL)','Sick Leave (SL)','Marriage Leave','Unpaid Leave (LWP/LOP)'].indexOf(p.type) < 0 || typeof p.reason !== 'string' || !p.reason.trim() || p.reason.length > 1000) staffError_('Choose a leave type and enter a reason (up to 1,000 characters).');
    if (!staffDateValid_(p.start) || !staffDateValid_(p.end) || p.start < today || p.end < p.start || p.start.slice(0,4) !== p.end.slice(0,4)) staffError_('Choose valid dates within the same calendar year, starting today or later.');
    const days = staffDays_(p.start, p.end);
    if (!days) staffError_('Sundays are free. Select at least one Monday–Saturday date.');
    const active = leave.filter(function(row) { return row.email === me.email && ['Pending','Approved'].indexOf(row.status) >= 0; });
    staffValidateLeave_(me, leave, today, p.type, p.start, days);
    if (active.some(function(row) { return row.start <= p.end && row.end >= p.start; })) staffError_('These dates overlap an existing leave request.');
    const record = {id: Utilities.getUuid(), email: me.email, type: p.type, start: p.start, end: p.end, days: days, reason: p.reason.trim(), status: 'Pending', created: today + ' ' + nowTime};
    staffPut_('Leave', record.id, record); return {};
  }
  if (p.operation === 'decision' || p.operation === 'cancel') {
    const record = leave.find(function(row) { return row.id === p.id; });
    if (!record || record.status !== 'Pending') staffError_('This request is no longer pending.');
    if (p.operation === 'cancel') {
      if (record.email !== me.email) staffError_('You can only cancel your own requests.',403);
      record.status = 'Cancelled';
    } else {
      if (!admin) staffError_('Administrator access required.',403);
      if (['Approved','Rejected'].indexOf(p.status) < 0) staffError_('Invalid decision.');
      if (p.status === 'Approved') {
        const owner = people.find(function(person) { return person.email === record.email; });
        staffValidateLeave_(owner, leave.filter(function(row) { return row.id !== record.id; }), today, record.type, record.start, record.days);
      }
      record.status = p.status; record.reviewed_by = me.email; record.reviewed_at = today + ' ' + nowTime;
    }
    staffPut_('Leave', record.id, record); return {};
  }
  if (p.operation === 'staff') {
    if (!admin) staffError_('Administrator access required.',403);
    const email = typeof p.email === 'string' ? p.email.trim().toLowerCase() : '';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254 || typeof p.name !== 'string' || !p.name.trim() || p.name.length > 100) staffError_('Enter a name and valid email.');
    if (email === STAFF_APPROVER) staffError_('The office administrator account is protected.',403);
    const originalEmail = typeof p.originalEmail === 'string' ? p.originalEmail.trim().toLowerCase() : email;
    if (originalEmail === STAFF_APPROVER) staffError_('The office administrator account is protected.',403);
    const existing = people.find(function(person) { return person.email === originalEmail; });
    if (originalEmail !== email && (!existing || people.some(function(person) { return person.email === email; }))) staffError_('The original employee must exist and the new email must be unused.');
    const joiningDate = p.joiningDate === undefined ? (existing && existing.joiningDate || '') : p.joiningDate;
    if (joiningDate && (!staffDateValid_(joiningDate) || joiningDate > today)) staffError_('Enter a valid joining date in YYYY-MM-DD format.');
    if (originalEmail !== email) {
      attendance.forEach(function(record) { if (record.email === originalEmail) { record.email = email; staffPut_('Attendance',record.id,record); } });
      leave.forEach(function(record) { if (record.email === originalEmail) { record.email = email; staffPut_('Leave',record.id,record); } });
    }
    if (originalEmail !== email || p.active === false) {
      staffRows_('Auth').forEach(function(record) { if (record.email === originalEmail || record.email === email) { record.hash = ''; record.expires = 0; staffPut_('Auth',record.email,record); } });
    }
    staffSavePerson_({originalEmail: originalEmail, email: email, name: p.name.trim(), role: email === STAFF_APPROVER ? 'admin' : 'staff', quota: p.quota || 0, joiningDate: joiningDate, active: p.active === undefined ? (!existing || existing.active) : p.active === true}); return {};
  }
  staffError_('Unknown staff action.');
}


// Full annual SL/CL allowances unlock after 90 completed days of service.
// SL/CL reset each calendar year; marriage is a lifetime 10-day balance.
function staffLeaveType_(type) {
  if (type === 'Sick leave') return 'Sick Leave (SL)';
  if (type === 'Casual leave') return 'Casual Leave (CL)';
  return type;
}
function staffLeavePolicy_(person, leave, today) {
  const joiningDate = person && person.joiningDate;
  const valid = staffDateValid_(joiningDate) && joiningDate <= today;
  const eligibleFrom = valid ? new Date(Date.parse(joiningDate) + 90 * 86400000).toISOString().slice(0,10) : null;
  const eligible = !!eligibleFrom && today >= eligibleFrom;
  const annualAllowance = eligible ? 12 : 0;
  const balances = ['Sick Leave (SL)', 'Casual Leave (CL)', 'Marriage Leave', 'Unpaid Leave (LWP/LOP)'].map(function(type) {
    const records = leave.filter(function(row) { return person && row.email === person.email && staffLeaveType_(row.type) === type && (type === 'Marriage Leave' || row.start.slice(0,4) === today.slice(0,4)); });
    const used = records.filter(function(row) { return row.status === 'Approved'; }).reduce(function(sum,row) { return sum + row.days; },0);
    const pending = records.filter(function(row) { return row.status === 'Pending'; }).reduce(function(sum,row) { return sum + row.days; },0);
    const earned = type === 'Unpaid Leave (LWP/LOP)' ? null : type === 'Marriage Leave' ? 10 : annualAllowance;
    return {type: type, earned: earned, used: used, pending: pending, available: earned === null ? null : Math.max(0, earned - used - pending)};
  });
  return {eligible: eligible, eligibleFrom: eligibleFrom, balances: balances};
}
function staffValidateLeave_(person, leave, today, type, start, days) {
  if (!person || !person.active) staffError_('Staff account is inactive.',403);
  const policy = staffLeavePolicy_(person, leave, today);
  if (!policy.eligibleFrom) staffError_('Ask the administrator to set your joining date.');
  if (!policy.eligible || start < policy.eligibleFrom) staffError_('Leave is available after 90 days of service, from ' + policy.eligibleFrom + '.');
  const normalized = staffLeaveType_(type);
  const balance = policy.balances.find(function(item) { return item.type === normalized; });
  if (!balance) staffError_('This legacy leave type needs administrator review.');
  if (normalized !== 'Marriage Leave' && normalized !== 'Unpaid Leave (LWP/LOP)' && start.slice(0,4) !== today.slice(0,4)) staffError_('SL and CL can only use the allowance for the current calendar year.');
  if (balance.available !== null && days > balance.available) staffError_('Insufficient ' + normalized + ' balance. Available: ' + balance.available + ' days.');
}
