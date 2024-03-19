type AccessToken = {
  access_token: string;
  refresh_token: string;
  access_token_ttl: number;
  refresh_token_ttl: number;
};

const initialTokenSet: AccessToken = {
  access_token: "",
  refresh_token: "",
  access_token_ttl: 0,
  refresh_token_ttl: 0,
};

// 指定時間待つ
export const sleep = (delay: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, delay));

// レスポンスの取得処理
// エラー返された場合3000ms間再取得を行う
export const pollingWhileDuration = async (
  asyncRequest: () => Promise<Response>,
  durationMs = 3000,
  intervalMs = 200
) => {
  const start = performance.now();
  //無限ループの処理
  for (;;) {
    let response;
    try {
      response = await asyncRequest();
    } catch {
      response = { ok: false, status: 0 } as Response;
    }
    // responseでOKが帰ってくるもしくは3000ms経過してもokが帰ってこない場合抜ける
    if (response?.ok || performance.now() - start > durationMs) {
      return response;
    } else {
      // 200msインターバル取って再取得する
      await sleep(intervalMs);
    }
  }
};

//get token set
export function getTokenSet(): AccessToken {
  const accessTokenSet: string | null =
    typeof window !== "undefined"
      ? localStorage.getItem("accessTokenSet")
      : null;
  if (accessTokenSet !== null) {
    const parsedAccessTokenSet: AccessToken = JSON.parse(accessTokenSet);
    return parsedAccessTokenSet;
  } else {
    return initialTokenSet;
  }
}

// fetchAPI
export async function fetchInApi(
  url: string,
  options?: RequestInit
): Promise<Response> {
  // apiリクエストを行う
  const apiRequest = async () => {
    const res = await fetch(url, options);
    // console.log("res.status", res.status);
    if (res.status === 401) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
    return res;
  };

  const response = await pollingWhileDuration(apiRequest);
  console.log("response", response);

  return response;
}
