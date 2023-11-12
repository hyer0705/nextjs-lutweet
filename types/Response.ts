export interface IResponseData {
  ok: boolean;
  [key: string]: any;
}

export interface IResponseUserData extends IResponseData {
  user: {
    name: string;
    email: string;
  };
}

export interface IResponseWriteTweet extends IResponseData {
  tweet: {
    id: number;
  };
}

export interface IResponseTweetDetail extends IResponseData {
  tweetDetail: {
    id: number;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    user: {
      name: string;
      email: string;
    };
    _count: {
      hearts: number;
    };
  };
  isLiked: boolean;
}

export interface IResponseTweets extends IResponseData {
  tweets: IResponseTweetDetail["tweetDetail"][];
}
