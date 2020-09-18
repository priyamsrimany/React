import { SPHttpClient} from '@microsoft/sp-http'

export interface ICrudProps {
  description: string;
  listName: string;
  spHttpClient: SPHttpClient;
  siteUrl: string;

}
