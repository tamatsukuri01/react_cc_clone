import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/index.module.scss";
import { Meta } from "./meta";
import { useMediaQuery } from "@mui/material";
import { MIN_LANDSCAPE_WIDTH } from "@/hooks/useWindowSize";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {
  useAppDispatch as useDispatch,
  useAppSelector as useSelector,
} from "@/hooks/useStoreHooks";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const isLandscape = useMediaQuery(MIN_LANDSCAPE_WIDTH);
  const dispatch = useDispatch();

  return (
    <>
      <Meta />
      {isLandscape ? (
        <div className={`${styles["landscape-home"]}`}>
          <div className={`${styles["landscape-home-user-info"]}`}>
            <div className={`${styles["landscape-home-info"]}`}>
              <div className={`${styles["landscape-home-info-upper"]}`}>
                <div className={`${styles["landscape-home-user"]}`}>
                  <div className={`${styles["landscape-home-user-image"]}`}>
                    <AccountCircleIcon />
                  </div>
                  <div className={`${styles["landscape-home-user-name"]}`}>
                    <p className={`${styles["display-name"]}`}>test</p>
                    <a href="" className={`${styles["set-profile"]}`}>
                      testLink
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
}
