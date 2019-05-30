import { GET_TEMPLATIES, LISTING_DETAIL_DATA_FETCH, RESET_DETAIL_DATA, RESET_TEMPLATIES, INIT_TEMPLATE,LISTING_TOGGLE } from '../constants/reducerTypes'
import { templaties } from '../constants/listingDetail'

export const templatiesData = (state = templaties
    , action) => {
    switch (action.type) {
        case LISTING_DETAIL_DATA_FETCH:
            let publishTemplObj = action.data.basicData.publishTemplObj;
            let descriptionTemplateObj = action.data.productInfo.descriptionTemplateObj;
            let paymentTemplate = action.data.templateInfo.paymentTemplate;
            let returnTemplate = action.data.templateInfo.returnTemplate;
            let transportTemplate = action.data.templateInfo.transportTemplate;
            state.publishTemplObj.id = publishTemplObj.id ? publishTemplObj.id : "";
            state.publishTemplObj.name = publishTemplObj.name ? publishTemplObj.name : "";
            state.descriptionTemplateObj.tempId = descriptionTemplateObj ? descriptionTemplateObj.id : "";
            state.descriptionTemplateObj.name = descriptionTemplateObj ? descriptionTemplateObj.name : "";
            state.paymentTemplate.tempId = paymentTemplate ? paymentTemplate.id : "";
            state.paymentTemplate.plsProfileId = paymentTemplate ? paymentTemplate.id : "";
            state.paymentTemplate.name = paymentTemplate ? paymentTemplate.name : "";
            state.returnTemplate.tempId = returnTemplate ? returnTemplate.id : "";
            state.returnTemplate.plsProfileId = returnTemplate ? returnTemplate.id : "";
            state.returnTemplate.name = returnTemplate ? returnTemplate.name : "";
            state.transportTemplate.tempId = transportTemplate ? transportTemplate.id : "";
            state.transportTemplate.plsProfileId = transportTemplate ? transportTemplate.id : "";
            state.transportTemplate.name = transportTemplate ? transportTemplate.name : "";
            return { ...state };
        case GET_TEMPLATIES:
            if (action.publishTemplId) {
                state.publishTemplObj.id = action.publishTemplId;
                state.publishTemplObj.name = action.templateName;
            }
            if (action.descTemplId) {
                state.descriptionTemplateObj.tempId = action.descTemplId;
                state.descriptionTemplateObj.name = action.descTemplName;
            }
            if (action.paymentProfileId) {
                state.paymentTemplate.tempId = action.paymentProfileId;
                state.paymentTemplate.name = action.paymentProfileName;
            }
            if (action.returnProfileId) {
                state.returnTemplate.tempId = action.returnProfileId;
                state.returnTemplate.name = action.returnProfileName;
            }
            if (action.shippingProfileId) {
                state.transportTemplate.tempId = action.shippingProfileId;
                state.transportTemplate.name = action.shippingProfileName;
            }
            return { ...state };
        case INIT_TEMPLATE:
            // if(action.publishTemplId){
            state.publishTemplObj.id = action.publishTemplId;
            state.publishTemplObj.name = action.templateName;
            // }
            // if(action.descTemplId){
            state.descriptionTemplateObj.tempId = action.descTemplId;
            state.descriptionTemplateObj.name = action.descTemplName;
            // }
            // if(action.paymentProfileId){
            state.paymentTemplate.tempId = action.paymentProfileId;
            state.paymentTemplate.name = action.paymentProfileName;
            // }
            // if(action.returnProfileId){
            state.returnTemplate.tempId = action.returnProfileId;
            state.returnTemplate.name = action.returnProfileName;
            // }
            // if(action.shippingProfileId){
            state.transportTemplate.tempId = action.shippingProfileId;
            state.transportTemplate.name = action.shippingProfileName;
            // }
            return { ...state };
        case RESET_TEMPLATIES:
            return {
                publishTemplObj: { id: "", name: "" },
                descriptionTemplateObj: { tempId: "", name: "", plsProfileId: "" },
                paymentTemplate: { tempId: "", name: "", plsProfileId: "" },
                returnTemplate: { tempId: "", name: "", plsProfileId: "" },
                transportTemplate: { tempId: "", name: "", plsProfileId: "" }
            }
        case RESET_DETAIL_DATA:
            return {
                publishTemplObj: { id: "", name: "" },
                descriptionTemplateObj: { tempId: "", name: "", plsProfileId: "" },
                paymentTemplate: { tempId: "", name: "", plsProfileId: "" },
                returnTemplate: { tempId: "", name: "", plsProfileId: "" },
                transportTemplate: { tempId: "", name: "", plsProfileId: "" }
            }

        case LISTING_TOGGLE:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
};
