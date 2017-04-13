const connectionEvents = (mongoose) => {
  const conn = mongoose.connection;

  conn.on('connecting', function() {
    console.log('connecting to MongoDB...');
  });
  conn.on('error', function(error) {
    console.error('Error in MongoDb connection: ' + error);
  });
  conn.on('connected', function() {
    console.log('MongoDB connected!');
  });
  conn.once('open', function() {
    console.log('MongoDB connection opened!');
  });
  conn.on('reconnected', function () {
    console.log('MongoDB reconnected!');
  });
  conn.on('disconnected', function() {
    console.log('MongoDB disconnected!');
  });
};

export default connectionEvents;
