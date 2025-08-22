const cron= require("node-cron");

function ExpiryCron(){
    cron.schedule('* * * * * *', () => {
        console.log('running a task every minute');
      });

}

module.exports= ExpiryCron;