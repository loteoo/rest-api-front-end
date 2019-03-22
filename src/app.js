import {h, app} from 'hyperapp'

import 'spectre.css'
import './style.css'

import {init} from './init'
import {view} from './view'
import {subscriptions} from './subscriptions'

import {FetchUsers} from './actions'
import {enableOnMountDomEvent} from './utils'

enableOnMountDomEvent()

// Initialize the app
app({
  init: FetchUsers(init),
  view,
  subscriptions,
  container: document.body
})
