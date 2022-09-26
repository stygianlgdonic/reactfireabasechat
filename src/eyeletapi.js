export function handleTorch() {
  // All API in one example.
  let allReady;
  // 1⃣. Check if Eyelet is ready
  let eyeletReady = new Promise((resolve) => {
    // It can be ready 
    if (window.eyeletReady === true) resolve()
    // Or we need to wait for a moment
    else window.eyeletReadyPromise = () => resolve()
  })

  // Once Eyelet is ready...
  eyeletReady.then(() => {
    //2⃣. We can access User info.
    // It's {Object} if User exists and null if not.
    console.log({ userInfo: window.eyelet.getUserInfo() })
    if (!window.eyelet.getUserInfo()) {
      // 3⃣. No User? Let's create one.
      let data = {
        name: "Bill",
        email: "Bill@example.com",
        createdAt: new Date().toISOString(),
        companyId: "BillCompanyId"
      }
      window.eyelet.auth(data)
    } else {
      // User exists? Let's authenticate them anyway.
      let data = {
        email: "Bill@example.com"
      }
      window.eyelet.auth(data)
    }
  })

  // 4⃣. Checking if User is ready or just created, the same way as eyeletReady logic works.
  let eyeletUserReady = new Promise((resolve) => {
    if (window.eyeletUserReady === true) resolve()
    window.eyeletUserReadyPromise = () => resolve()
  })

  // And when we've managed User...
  eyeletUserReady.then(() => {
    // 5⃣. We can, for example, add some segments
    let segments = ["happy", "customers"]
    window.eyelet.handleUserSegments("concat", segments, segmentsCallback)
    // And do something when segment is added
    function segmentsCallback(msg) {
      console.log({ msg })
      if (msg.success) {
        // 6⃣. For example, start a tour only if User has a particular segment
        if (msg.segments.indexOf("happy") !== -1) window.eyelet.startTour("myTourId")
      }
    }
  })
  // 7⃣. Also we can just know when Eyelet and User are finally ready and use this info later
  allReady = Promise.all([eyeletReady, eyeletUserReady])
  return allReady;
}