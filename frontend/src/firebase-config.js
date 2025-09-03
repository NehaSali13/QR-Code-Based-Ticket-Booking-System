// import { initializeApp } from "firebase/app";
// import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

// const firebaseConfig = {
//    apiKey: "AIzaSyAidZ52lLhBDs-GHVQzthxj0OiE7E6u_5U",
//   authDomain: "ticket-booking-fc937.firebaseapp.com",
//   projectId: "ticket-booking-fc937",
//   storageBucket: "ticket-booking-fc937.firebasestorage.app",
//   messagingSenderId: "709032490474",
//   appId: "1:709032490474:web:792211fe4b324a7467ae93",
//   measurementId: "G-FZKR0PXF5Q"
// };

// // ✅ Initialize Firebase App
// const app = initializeApp(firebaseConfig);

// // ✅ Firebase Auth Instance
// export const auth = getAuth(app);

// // ✅ Generate reCAPTCHA (called in Login.js)
// export const generateRecaptcha = () => {
//   if (!window.recaptchaVerifier) {
//     window.recaptchaVerifier = new RecaptchaVerifier(
//       'recaptcha-container',
//       {
//         size: 'invisible',
//         callback: (response) => {
//           console.log("reCAPTCHA verified", response);
//         },
//         'expired-callback': () => {
//           console.warn("reCAPTCHA expired, please try again.");
//         }
//       },
//       auth
//     );

//     // ✅ Optional: render the invisible widget (required in some cases)
//     window.recaptchaVerifier.render().then((widgetId) => {
//       window.recaptchaWidgetId = widgetId;
//     });
//   }
// };
// // 
// // ✅ Export for Login.js
// export { signInWithPhoneNumber };
