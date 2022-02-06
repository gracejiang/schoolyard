const GOOGLE_API_KEY = 'AIzaSyAit3AnqSFEwBTuFMFK9YG3FejpHsOD4-g'
const GOOGLE_CLIENT_ID = '639118635606-4mk1qa8pnfl7d48lcrpd5u8tr15qmvj5.apps.googleusercontent.com'

const authenticate = (onSuccess, onError) => {
  return gapi.auth2.getAuthInstance()
    .signIn({scope: "https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/calendar.events.readonly https://www.googleapis.com/auth/calendar.readonly"})
    .then(onSuccess, function(err) { console.error(err); alert("Error signing in"); onError(err)});
}
const loadClient = (afterLoading, onError) => () => {
  gapi.client.setApiKey(GOOGLE_API_KEY);
  return gapi.client.load("https://content.googleapis.com/discovery/v1/apis/calendar/v3/rest")
    .then(afterLoading,
      function(err) { alert("Error loading GAPI client for API"); console.error(err); onError(err) });
}

const initialize = (afterInitializing, onError) => {
  if (gapi?.client?.calendar?.calendarList) {
    afterInitializing()
  } else {
    gapi.load("client:auth2", function () {
      gapi.auth2.init({client_id: GOOGLE_CLIENT_ID});
      authenticate(loadClient(afterInitializing, onError), onError)
    })
  }
};

export const loadCalendarList = () => {
  return new Promise((resolve, reject) => {
    initialize(() => {
      gapi.client.calendar.calendarList.list({})
        .then(function (response) {
            resolve(response?.result?.items);
          },
          function (err) {
            alert("Error loading calendars list");
            console.error(err);
            reject();
          });
    }, reject)
  })
}

export const loadCalendarEvents = calendarId => {
  return new Promise((resolve, reject) => {
    initialize(() => {
      gapi.client.calendar.events.list({
        calendarId,
        timeMin: new Date(new Date().getTime() - 2 * 31 * 24 * 60 * 60 * 1000).toISOString(),
        timeMax: new Date(new Date().getTime() + 18 * 31 * 24 * 60 * 60 * 1000).toISOString(),
        maxResults: 1000,
      })
        .then(function (response) {
            resolve(response?.result?.items);
          },
          function (err) {
            alert("Error loading calendar events");
            console.error(err);
            reject();
          });
    }, reject)
  })
}