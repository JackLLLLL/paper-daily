# paper-daily
~~check-in web page for cjc gaming club~~  github wiki history display page

### components needed:
* [pwa](https://developer.mozilla.org/en-US/Apps/Progressive) (service worker) ✔️
* [React](https://github.com/facebook/react) ✔️
* [koa](https://github.com/koajs/koa) ✔️
* [NeDB](https://github.com/louischatriot/nedb) ❌
* [bluebird](https://github.com/petkaantonov/bluebird) (promisify all nedb query) ❌
* [Ant Design](https://github.com/ant-design/ant-design) ✔️

### features to implement:
* log in, log out, sign in  ❌
* set task (what to read)  ❌
* check in (to finish the task, and maybe push to timeline, maybe in the form of check-in request)  ❌
* timeline (task finished time and content of task, maybe link to it)  ✔️
* notification (to all users, if someone does not reach the goal, maybe add 'group' in future)  ❌
* comment (check in maybe need to be reviewed by others)  ❌
