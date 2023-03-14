export type StreamDataType = {
    displayName: string;
    url: string;
    logo: string;
    picture: string;
    movieId: string;
  };
  

export interface WatchListItem {
    id: number;
    movieId: string;
    term: string;
    title: string;
    url: string;
    icon: string;
    picture: string;
  }