import React from "react";

const MiniProfile = ({ userInformation }) => {
  return (
    <section className="mini-profile ">
      <h3>Profil Bilgilerim</h3>
      <ul>
        <li>
          <strong>Telefon No: </strong>
          {userInformation.phoneNo}
        </li>
        <li>
          <strong>T.C. Kimlik No: </strong>
          {userInformation.tcNo}
        </li>
        <li>
          <strong>Doğum Tarihi: </strong>
          {userInformation.birthday}
        </li>
        <li>
          <strong>Hasat Kart</strong>
          {userInformation.hasatKart === "false"
            ? "'a sahip değilsiniz."
            : "'a sahipsiniz."}
        </li>
      </ul>
    </section>
  );
};

export default MiniProfile;
