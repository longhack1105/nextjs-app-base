import styles from "./SplashScreen.module.scss";
import { useSelector } from "react-redux";
import { PropsSplashScreen } from "./interfaces";
import { RootState, store } from "@/redux/store";
import * as loading1 from "../../../../public/static/anim/loading_Bibet.json";
import { Fragment, memo, useEffect } from "react";
import { getItemStorage, setItemStorage } from "@/common/funcs/localStorage";
import CryptoJS from "crypto-js";
import { setStateLogin, setToken } from "@/redux/reducer/auth";
import { setInfoUser } from "@/redux/reducer/user";
import { enumDeviceType, setDeviceType, setLoading } from "@/redux/reducer/site";
import clsx from "clsx";
import Lottie from "react-lottie";

function SplashScreen({}: PropsSplashScreen) {
  const { loading } = useSelector((state: RootState) => state.site);
  const { token, isLogin } = useSelector((state: RootState) => state.auth);
  const { infoUser } = useSelector((state: RootState) => state.user);
  const authenData = "authen-data";

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: JSON.parse(JSON.stringify(loading1)),
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  useEffect(() => {
    (async () => {
      // Lấy dữ liệu authen-data rồi gắn vào store
      const state = await getItemStorage(authenData);
      if (!!state) {
        const bytes = CryptoJS.AES.decrypt(state, process.env.NEXT_PUBLIC_KEY_CERT!);
        const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        store.dispatch(setToken(decryptedData.token));
        store.dispatch(
          setInfoUser({
            ...decryptedData.infoUser,
          })
        );
        store.dispatch(setStateLogin(decryptedData.isLogin));
      }
      store.dispatch(setLoading(false));

      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

      if (isMobile) {
        store.dispatch(setDeviceType(enumDeviceType.Mobile));
      } else {
        store.dispatch(setDeviceType(enumDeviceType.Desktop));
      }

      // axios
      //  .get('https://api.ipify.org?format=json')
      //  .then((res) => store.dispatch(setIP(res.data.ip)));
    })();
  }, []);

  useEffect(() => {
    if (!loading) {
      const ciphertext = CryptoJS?.AES?.encrypt(
        JSON.stringify({
          token: token,
          isLogin: isLogin,
          infoUser: infoUser,
        }),
        process.env.NEXT_PUBLIC_KEY_CERT!
      ).toString();
      // Lưu dữ liệu authen-data
      setItemStorage(authenData, ciphertext);
    }
  }, [token, isLogin, loading, infoUser]);

  return (
    <Fragment>
      <div className={clsx(styles.container, { [styles.close]: !loading })}>
        <div className={styles.logo}>
          <Lottie options={defaultOptions} />
        </div>
      </div>
    </Fragment>
  );
}

export default memo(SplashScreen);
