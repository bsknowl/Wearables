module.exports = {
    writeToDeviceCloud : function ( deviceOutString )  {
    //Parse JSON DATA and write to Device Cloud
    /*var deviceOutString =  '' ;

    try {
	var parsedJson = JSON.parse(dsData) ;

	if ( parsedJson.length > 1 ) {
	   deviceOutString = '<list>' ;
	}

	for ( var i = 0 ; i < parsedJson.length ; i++ ) {

	   var subElemJson = parsedJson[i]; 

	    var subElemJsonPretty = JSON.stringify(subElemJson,null,0); 

	    var streamId = elementId + '/' + subElemJson['userId'] ;

            console.info('Stream ID ' + streamId );

            console.info('Pretty JSON ' + subElemJsonPretty );

            var data = '<DataPoint> <data>' + subElemJsonPretty + '</data> <streamId>' + streamId + '</streamId> <description>Temperature at device 1</description> <location>0.0, 0.0, 0.0</location> <quality>99</quality> <streamType>float</streamType> <streamUnits>Kelvin</streamUnits> <streamForwards>allDevices/temp, allDevices/metrics</streamForwards> </DataPoint>' ;
            console.info('Created DATA ' + data );

	    deviceOutString = deviceOutString + data ;
	}

	if ( parsedJson.length > 1 ) {
	      deviceOutString = deviceOutString + '</list>' ;
	}

        //if ( deviceOutString != '' ) {
           //console.info('CONCATENATED STring DATA ' + deviceOutString );
	   //deviceCloud.writeToDeviceCloud(deviceOutString);
	//}

     } catch (error) {
        console.info('Exception parsing \n\n'  + error);
        console.info('Not Writing to Device Cloud!!!! ' );
	return ;
     }*/


    var https = require('https');

    // Configure the application with you generated App ID and App Secret
    var DEVICE_CLOUD_PW     =  'Etherios1234$';
    var DEVICE_CLOUD_USER_ID     =  'RSrinivasan_Fitbit';

    var auth = DEVICE_CLOUD_USER_ID + ':' + DEVICE_CLOUD_PW ;
    if ( deviceOutString != '' ) {
         console.info('Writing to Device Cloud!!!! ' + deviceOutString );
          var postheaders = {
              'Accept': 'application/json'
          };
          var optionsget = { 
              auth : auth,
              host : 'login.etherios.com', 
              port : 443,
              path : '/ws/DataPoint/',
              method : 'POST', // do POST
              headers : postheaders // POST HEADER
          };
 
          // do the GET request
          var reqGet = https.request(optionsget, function(res) {
               console.log("statusCode: ", res.statusCode);
               res.on('data', function(d) {
	            //Store last retrieval timestamp in database Database and 
                    console.info('Write to Device Cloud POST result:\n');
                    process.stdout.write(d);
                    console.info('\n\nWrite to Device Cloud Completed Call completed');
               });
 
          });
          reqGet.write(deviceOutString);
          reqGet.end();
          reqGet.on('error', function(e) {
              console.error('Error Writing to Device Cloud' + e);
          });
      }
}
};
