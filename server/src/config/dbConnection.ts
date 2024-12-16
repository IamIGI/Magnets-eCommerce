import mongoose from 'mongoose';
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URI!);
    } catch (err) {
        console.error('DB no connection');
        console.error(err);
    }
};

export default connectDB;
