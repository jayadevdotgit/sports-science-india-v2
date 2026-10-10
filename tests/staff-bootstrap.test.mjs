import {test} from 'node:test';
import assert from 'node:assert/strict';
import {setWorkspaceBootstrap,takeWorkspaceBootstrap} from '../lib/staff/workspace-bootstrap.ts';

test('workspace handoff is one-use, expires, and clears on legacy responses',()=>{
  const data={me:{email:'staff@example.test'},people:[],attendance:[],leave:[],today:'2026-10-11'};
  setWorkspaceBootstrap(data);
  assert.deepEqual(takeWorkspaceBootstrap(),data);
  assert.equal(takeWorkspaceBootstrap(),null);
  setWorkspaceBootstrap(data);
  setWorkspaceBootstrap(undefined);
  assert.equal(takeWorkspaceBootstrap(),null);
  setWorkspaceBootstrap({me:{}});
  assert.equal(takeWorkspaceBootstrap(),null);
  const realNow=Date.now;
  try {
    Date.now=()=>1000;
    setWorkspaceBootstrap(data);
    Date.now=()=>31001;
    assert.equal(takeWorkspaceBootstrap(),null);
  } finally {Date.now=realNow;}
});
