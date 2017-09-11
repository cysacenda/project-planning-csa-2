export class ThreadManagement {

  public static StartThreadFull(): void {
    const {execFile} = require('child_process');
    // TODO : Config
    const child = execFile('node', ['./dist/server/algo/child-thread-full.js'], (error, stdout, stderr) => {
      if (error) {
        console.log(error);
        console.log(stderr);
        throw error;
      }
    });
  }


  public static StartThreadResource(resourceTrigram: string): void {
    const {execFile} = require('child_process');
    // TODO : Config
    const child = execFile('node', ['./dist/server/algo/child-thread-resource.js', resourceTrigram], (error, stdout, stderr) => {
      if (error) {
        console.log(error);
        console.log(stderr);
        throw error;
      }
    });
  }
}