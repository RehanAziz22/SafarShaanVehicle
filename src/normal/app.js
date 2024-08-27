var requestOptions = {
    method: 'GET',
};

fetch("https://api.geoapify.com/v1/geocode/reverse?lat=24.8556917&lon=67.01062&apiKey=c62a11476cdf4d0b8da38ef393c421bc", requestOptions)
    .then(response => response.json())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
