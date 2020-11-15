interface GETResponseListener
{
    handleGETResponse(status:number, response:string):void;
}

interface POSTResponseListener
{
    handlePOSTResponse(status:number, response:string):void;
}

class MyFramework
{
    getElementById(id:string):HTMLElement
    {
        let e:HTMLElement;
        e = document.getElementById(id);
        return e;
    }

    getElementByEvent(evt:Event):HTMLElement
    {
        return <HTMLElement>evt.target;
    }

    requestGET(url:string, listener: GETResponseListener):void
    {
        let xhr: XMLHttpRequest;
        xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function()
        {
            if(xhr.readyState == 4)
            {
                if(xhr.status == 200)
                {
                    listener.handleGETResponse(xhr.status,xhr.responseText);
                }
                else
                {
                    listener.handleGETResponse(xhr.status,null);
                }
            }
        };
        
        xhr.open('GET', url, true);
        xhr.send(null);
    }

    requestPOST(url:string, data:object, listener:POSTResponseListener):void
    {
        let xhr: XMLHttpRequest;
        xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function()
        {
            if(xhr.readyState == 4)
            {
                if(xhr.status == 200)
                {
                    listener.handlePOSTResponse(xhr.status,xhr.responseText);
                }
                else
                {
                    listener.handlePOSTResponse(xhr.status,null);
                }
            }
        };
        
        xhr.open('POST', url);

        // envio JSON en body de request (Usar con NODEJS)
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        let respuesta= xhr.send(JSON.stringify(data));
       
    }

    configEventLister (event:string, id:string, listener:EventListenerObject):void
    {
        let b:HTMLElement = document.getElementById (id);
        b.addEventListener (event,listener);
    }


}
