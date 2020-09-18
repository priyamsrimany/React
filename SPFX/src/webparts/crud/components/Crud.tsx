import * as React from 'react';
import styles from './Crud.module.scss';
import { ICrudProps } from './ICrudProps';
import { ICrudState } from './ICrudStates';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import { escape } from '@microsoft/sp-lodash-subset';
import {IListItem} from './IListItem';
import * as ReactDOM from 'react-dom';

export default class Crud extends React.Component<ICrudProps,ICrudState> 
{
   readClick:boolean = false;
 
  domElement: any;
  constructor( props: ICrudProps, states: ICrudState)
  {
    super(props);
    this.state
    {
        status:"Loading...";
        items: []
    }
      //
  }

  componentWillMount()
  {
   //this.ReadProcuct();
  
   this._getProductList()  
      .then((response) => {  
        console.log(response);
        
       this._renderList(response.value);  
       
      });  
  }
  private DeleteItem(): void
  {
    //alert(productId);
  }


  async downloadTemplate() {
    // location.href =
    //   this.props.siteUrl +
    //   "/_layouts/15/download.aspx?UniqueId=be08fedb%2Dedb9%2D4a34%2Dba80%2D5b1d6268f64c";
    var FilesData = await this.props.spHttpClient
      .get(
        `${this.props.siteUrl}/_api/web/lists/getByTitle('Documents')/items?$select=Title&$filter=Title eq 'ABC.pdf'`,
        SPHttpClient.configurations.v1
      )
      .then((response: SPHttpClientResponse) => {
        return response.json();

      });
     console.log(FilesData);
     
     location.href =this.props.siteUrl+"/_layouts/15/download.aspx?SourceUrl="+this.props.siteUrl+"/Shared%20Documents/ABC.pdf"
    
    if (FilesData.value.length > 0) {
      //window.open(pdfUrl, '_blank');
      const pdfUrl =this.props.siteUrl+"/Shared%20Documents/Forms/AllItems.aspx?id=/Shared%20Documents/ABC.pdf"
       // this.props.siteUrl +
       // "/_layouts/15/download.aspx?UniqueId=" +
       // FilesData.value[0].UniqueId;
    } else {
      alert("Contact System Administrator for help");
    }
    //'https://piyali17.sharepoint.com/sites/TestTeamSte01/
    //_layouts/15/download.aspx?UniqueId=9602106e%2D3ec1%2D463e%2Da150%2D434650b0467c';
  }

    private _renderList = (value: IListItem[]) =>
    {
      let html: string = '<table class="TFtable" border=1 width=100% style="border-collapse: collapse;">';  
      html += `<th>Product</th><th>Description</th><th>Id</th><th>Product Id</th>`; 
      if(value!=undefined)
      {
      if(value.length>0)
      { 
      value.forEach((item: IListItem) => {  
        html += `  
             <tr>  
            <td>${item.Title}</td>  
            <td>${item.ProductId}</td>  
            <td>${item.Description}</td> 
            <td><a onclick="${this.DeleteItem()}">Delete</a></td> 
            </tr>  
            `;  
      });  
    }
  }
    else{
      html += `  
      <tr>  
     <td style='"colspan=3"'>No Item found</td>  
     </tr>  
     `;  
    }
      html += `</table>`;  
      //ReactDOM.render(html, document.getElementById('spListContainer'));
      const listContainer: Element = document.getElementById('spListContainer');  
      listContainer.innerHTML = html;  
    }

   

   private _getProductList = () => {
    return this.props.spHttpClient
      .get(
        this.props.siteUrl + `/_api/web/lists/GetByTitle('EmptyProduct')/items?$select=Title,Description,ProductId`,
        SPHttpClient.configurations.v1,
        {
          headers: {
            Accept: "application/json;odata=nometadata",
            "odata-version": "",
          },
        }
      )
      .then((response: SPHttpClientResponse) => {
        return response.json();
      },
      (error: any) =>
      {
        console.log(error.message);
        return null;
      });
  };

  private SaveToList = ()  => 
  {
    this.setState({
      status: 'Loading post items...',
      items: []
    });
    //const body: string = JSON.stringify(InitiativeData);
    
    const body: string = JSON.stringify({  
      'Title': `MacBook`,'Description': `Mac`,'ProductId':1
    }); 
      return this.props.spHttpClient
        .post(
          `${this.props.siteUrl}/_api/web/lists/getbytitle('EmptyProduct')/items`,
          SPHttpClient.configurations.v1,
          {
            headers: {
              Accept: "application/json;odata=nometadata",
              "Content-type": "application/json;odata=nometadata",
              "odata-version": "",
            },
            body: body,
          }
        )
        .then(
          (response: SPHttpClientResponse): Promise<IListItem> => {
            return response.json();
          }
        )
        .then(
          (item: IListItem) => {
            const html: string = "Item craeted"
            const listContainer: Element = document.getElementById('spListContainer');  
      listContainer.innerHTML = html;  
            return item;
          },
          (error: any): void => {
            this.setState({
              status: "Error while creating the item: " + error,
              // items: [],
            });
          }
        );
    
  }

  

  ReadProcuct():void
  {
    debugger;
    this.setState({
      status: 'Loading all items...',
      items: []
    });
    this.props.spHttpClient.get(`${this.props.siteUrl}/_api/web/lists/getbytitle('${this.props.listName}')/items?$select=Title,Description,ProductId`,
      SPHttpClient.configurations.v1,
      {
        headers: {
          'Accept': 'application/json;odata=nometadata',
          'odata-version': ''
        }
      })
      .then((response: SPHttpClientResponse): Promise<{ value: IListItem[] }> => {
        debugger;
        return response.json();
      })
      .then((response: { value: IListItem[] }): void => {
        debugger;
        this.setState({
          status: `Successfully loaded ${response.value.length} items`,
          items: response.value
        });
      }, (error: any): void => {
        this.setState({
          status: 'Loading all items failed with error: ' + error,
          items: []
        });
      });
  }
  
 



  public render(): React.ReactElement<ICrudProps> 
  {
    

    return (
      <div className={ styles.crud }>
     
        <div className='ms-Grid-col ms-u-lg10 ms-u-xl8 ms-u-xlPush2 ms-u-lgPush1'>
<a href="#" className={`${styles.button}`} onClick={() => this._getProductList()}>
  <span className={styles.label}>Read all items</span>
</a>
</div>

<br/>

<div className='ms-Grid-col ms-u-lg10 ms-u-xl8 ms-u-xlPush2 ms-u-lgPush1'>
<a href="#" className={`${styles.button}`} onClick={() => this.SaveToList()}>
  <span className={styles.label}>Post items</span>
</a>
</div>

<div className="IdeaFileDetailButton">
                <button
                  id="btndownload"
                  onClick={() => this.downloadTemplate()}
                >
                  Download Idea Template
                </button> </div>

<div id="spListContainer">List Item</div>

<div>


</div>


</div>
    );
  }
}
