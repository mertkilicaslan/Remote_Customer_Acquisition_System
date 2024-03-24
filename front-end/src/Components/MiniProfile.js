const MiniProfile = (props) => {
  const { t, userInformation } = props;

  return (
    <section className="mini-profile ">
      <h3>{t("myProfileInformation")}</h3>
      <ul>
        <li>
          <strong>{t("phoneNo")}: </strong>
          {userInformation.phoneNo}
        </li>
        <li>
          <strong>{t("tckno")}: </strong>
          {userInformation.tcNo}
        </li>
        <li>
          <strong>{t("birthday")}: </strong>
          {userInformation.birthday}
        </li>
        <li>
          <strong>{t("harvestCard")}</strong>
          {userInformation.hasatKart === "false"
            ? "'a sahip değilsiniz."
            : "'a sahipsiniz."}
        </li>
      </ul>
    </section>
  );
};

export default MiniProfile;
