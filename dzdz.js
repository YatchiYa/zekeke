
    var zakekeCustomerId = false;
    

    if (window.zakekeDesigner) {
        zakekeDesigner({"zakekeUrl":"https://portal.zakeke.com/","zakekeApiUrl":"https://api.zakeke.com/api/","shop":"skybreaker-6403.myshopify.com","priceHide":false,"variantsHide":false,"productAdvancedProcessing":false,"productId":8601908117839,"variantId":46924542673231,"design":null,"shared":null,"quantity":1,"properties":{},"locale":"en","customizationStrategy":0,"showFileNames":false,"directDownload":false,"sellingPlan":null,"template":null});
    } else {
        let zakekeStartupInterval = setInterval(() =>  {
                if (!window.zakekeDesigner) {
                    return;
                }
                
                zakekeDesigner({"zakekeUrl":"https://portal.zakeke.com/","zakekeApiUrl":"https://api.zakeke.com/api/","shop":"skybreaker-6403.myshopify.com","priceHide":false,"variantsHide":false,"productAdvancedProcessing":false,"productId":8601908117839,"variantId":46924542673231,"design":null,"shared":null,"quantity":1,"properties":{},"locale":"en","customizationStrategy":0,"showFileNames":false,"directDownload":false,"sellingPlan":null,"template":null});
                clearInterval(zakekeStartupInterval);
        }, 300);
    }