
const db = firebase.firestore();
const storage = firebase.storage();

function uploadDP() {
  const file = document.getElementById('photo').files[0];
  const phone = document.getElementById('phone').value.trim();
  if (!file || !phone) {
    alert("Fill all fields");
    return;
  }
  const code = Math.random().toString(36).substring(2, 8);
  const ref = storage.ref('dp/' + code + '.jpg');
  ref.put(file).then(() => {
    ref.getDownloadURL().then((url) => {
      db.collection("links").doc(code).set({
        phone: phone,
        image: url
      }).then(() => {
        const link = window.location.origin + "/view.html?code=" + code;
        document.getElementById('linkBox').innerHTML = "🔗 Link: <a href='" + link + "' target='_blank'>" + link + "</a>";
      });
    });
  });
}
