export class ThreadManagement {
  private static config = require('config');

  public static StartThreadFull(): void {
    const {execFile} = require('child_process');
    // TODO : Gérer pour qu'un seul Thread à la fois sauf si ressources différentes
    const child = execFile('node', [this.config.get('filesPath.childThreadFull')], (error, stdout, stderr) => {
      if (error) {
        console.log(error);
        console.log(stderr);
        throw error;
      }
    });
  }

  public static StartThreadResource(resourceTrigram: string): void {
    const {execFile} = require('child_process');
    const child = execFile('node', [this.config.get('filesPath.childThreadResource'), resourceTrigram], (error, stdout, stderr) => {
      if (error) {
        console.log(error);
        console.log(stderr);
        throw error;
      }
    });
  }
}
