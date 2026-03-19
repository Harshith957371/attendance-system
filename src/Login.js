import { useState } from "react";

function Login() {
  const [studentId, setStudentId] = useState("");

  function handleLogin() {
    if (!studentId) {
      alert("Enter Roll Number");
      return;
    }

    // 🚫 Prevent overwrite (once set, cannot change)
    if (localStorage.getItem("studentId")) {
      alert("Roll number already set on this device!");
      window.location.href = "/student";
      return;
    }

    localStorage.setItem("studentId", studentId);

    alert("Login successful!");
    window.location.href = "/student";
  }

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Student Login</h2>

      <input
        placeholder="Enter Roll Number"
        value={studentId}
        onChange={(e) => setStudentId(e.target.value)}
      />
      <br /><br />

      <button onClick={handleLogin}>Login</button>

      <p style={{ color: "red", marginTop: "15px" }}>
        ⚠️ Once you enter your Roll Number, it cannot be changed on this device.
      </p>
    </div>
  );
}

export default Login;