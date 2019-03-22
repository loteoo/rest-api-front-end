import {h, app} from 'hyperapp'

import 'spectre.css'
import './style.css'

import {init} from './app/init'
import {view} from './app/view'
import {subscriptions} from './app/subscriptions'

import {enableOnMountDomEvent} from './utils'

enableOnMountDomEvent()

// Initialize the app
app({init, view, subscriptions, container: document.body})
