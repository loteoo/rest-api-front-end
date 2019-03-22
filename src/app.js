import {h, app} from 'hyperapp'

import 'spectre.css'
import './style.css'

import {init} from './app/init'
import {view} from './app/view'
import {subscriptions} from './app/subscriptions'

import {FetchUsers, ParseUrl} from './app/actions'
import {enableOnMountDomEvent} from './utils'

enableOnMountDomEvent()

// Initialize the app
app({
  init: FetchUsers(ParseUrl(init, window.location.pathname)),
  view,
  subscriptions,
  container: document.body
})
