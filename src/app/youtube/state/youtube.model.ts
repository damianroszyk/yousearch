import { ID } from '@datorama/akita';

export interface Youtube {
  id: ID;
  kind: 'youtube#searchResult';
  etag: string;
  snippet: YoutubeSnippet;
}

export interface YoutubeSnippet {
  publishedAt: Date;
  channelId: string;
  title: string;
  description: string;
  thumbnails: { default: YoutubeSnippetThumbnail} ;
  channelTitle: string;
  liveBroadcastContent: string;
  favorite?: boolean;
}

export interface YoutubeSnippetThumbnail {
  url: string;
  width: number;
  height: number;
}

export interface PageInfo {
  totalResults: number;
  resultsPerPage: number;
}

export interface ServerResponse {
  items: any[];
  pageInfo: PageInfo;
  nextPageToken: string;
}
