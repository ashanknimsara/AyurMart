import Swal from "sweetalert2";
import "./alert.css";

const Toast = Swal.mixin({
  toast: true,
  position: "bottom-center",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  onOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

const Alert = (type,msg) => {
  Toast.fire({
    icon: type,
    title: msg,
  });
};

export default Alert;
