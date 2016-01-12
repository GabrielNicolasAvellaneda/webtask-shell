# webtask-shell

A quick hack of a shell for Webtask.io for exploring containers content. The shell runs commands as a Webtask. You can run any command with user-sanbox-* privileges and take a look at the whole filesystem and installed packages.

NOTE: On every command request, you will be running that command at a random container. The shell will keep track of your current working directory to not lose the state.

## Quickstart

1. Clone the repo

    ```
      $ git clone https://github.com/GabrielNicolasAvellaneda/webtask-shell
      $ cd webtask-shell
      $ npm install
   ```
2. Publish the Webtask and get the URL for it
   ```bash
      $ wt create shell-srv.js
      https://webtask.it.auth0.com/api/run/wt-avellaneda_gabriel-gmail_com-0/shell-srv?webtask_no_cache=1
   ```

3. Run the shell
   ```bash
      $ node shell-cli https://webtask.it.auth0.com/api/run/wt-avellaneda_gabriel-gmail_com-0/shell-srv?webtask_no_cache=1
      /data$
   ```

4. Run some commands
   ```bash
      /data$ whoami
      user-sandbox-27

      /data$ ps fax
      PID TTY      STAT   TIME COMMAND
        1 ?        Ssl    0:01 node server.js
       21 ?        S      0:00 /bin/sh -c "/usr/local/bin/node" /tmp/shelljs_0b8c7e969322aa532ebb
       22 ?        Sl     0:00  \_ /usr/local/bin/node /tmp/shelljs_0b8c7e969322aa532ebb
       27 ?        S      0:00      \_ /bin/sh -c ps fax
       28 ?        R      0:00          \_ ps fax

      /data$ dpkg -l
   ```
