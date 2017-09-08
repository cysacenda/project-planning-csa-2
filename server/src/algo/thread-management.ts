export class ThreadManagement {

  public static StartThread() {
    const {execFile} = require('child_process');
    const child = execFile('node ./child-thread.js', (error, stdout, stderr) => {
      if (error) {
        console.log(error);
        console.log(stderr);
        throw error;
      }
      console.log(stdout);
    });
  }
}
