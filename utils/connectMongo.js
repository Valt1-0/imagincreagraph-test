import mongoose from 'mongoose';
import chalk from 'chalk';

const connectMongo = async () =>{
    if(mongoose.connections[0].readyState) {
        console.log(chalk.red('Already Connected'));
        return;
    }

    mongoose.connect(process.env.MONGO_URI, {}, err => {
        if(err) throw err;
        console.log(chalk.green('Connected Succesfully at', chalk.blue(mongoose.connection.name)));
    })

}

export default connectMongo;