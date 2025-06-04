import mongoose from "mongoose"
import 'dotenv/config';

const dbConnection = () => {
  mongoose
    .connect(process.env.DATABASE_URL)
    .then(() => {
      console.log("DB is connected bro 😉");
    })
    .catch((err) => {
      console.log(err);
    });
};

export default  dbConnection;
