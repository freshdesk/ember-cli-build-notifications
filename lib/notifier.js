'use strict';

const nodeNotifier = require('node-notifier');
const path = require('path');
const merge = require('./merge');
const totalTime = require('./total-time');
const notificationGroup = 'ember-cli-build-notifications';

module.exports = {
  buildSuccess(results, options) {
    const notifier = (options && options.notifier) || nodeNotifier;
    const appIcon = path.resolve(__dirname, '..', `${options.icon}-success.png`);

    let notificationOptions = {
      title: 'Build Succeeded',
      message: 'Build Time: ' + totalTime(results),
      appIcon,
      group: notificationGroup
    };

    if (options && options.notificationOptions) {
      notificationOptions = merge(notificationOptions, options.notificationOptions);
    }

    return notifier.notify(notificationOptions);
  },

  buildError(error, options) {
    const notifier = (options && options.notifier) || nodeNotifier;
    const appIcon = path.resolve(__dirname, '..', `${options.icon}-error.png`);

    // fetching file from broccoliPayload
    let file;
    try {
      file = error.broccoliPayload.error.location.file;
    } catch (e) {
      file = error.file || 'unknown';
    }

    let notificationOptions = {
      title: 'Build Failed',
      subtitle: file,
      message: error.toString(),
      appIcon,
      group: notificationGroup
    };

    if (options && options.notificationOptions) {
      notificationOptions = merge(notificationOptions, options.notificationOptions);
    }

    return notifier.notify(notificationOptions);
  }
};
