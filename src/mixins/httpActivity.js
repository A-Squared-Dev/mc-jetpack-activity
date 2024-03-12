import axios from 'axios';
import * as xml2json from 'xml-js';

const VITE_APP_URL = import.meta.env.VITE_APP_URL.replace(/\/+$/, '');

export default {
  methods: {
    async dataExtensionSearch (accessToken, endpointSubdomain, attributeName, operator, attributeValue) {
      const envelope = `
        <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
          <soapenv:Header>
            <fueloauth xmlns="http://exacttarget.com">${accessToken}</fueloauth>
          </soapenv:Header>
          <soapenv:Body>
            <RetrieveRequestMsg xmlns="http://exacttarget.com/wsdl/partnerAPI">
              <RetrieveRequest>
                <ObjectType>DataExtension</ObjectType>
                <Properties>CustomerKey</Properties>
                <Properties>Name</Properties>
                <Filter xsi:type="SimpleFilterPart">
                  <Property>${attributeName}</Property>
                  <SimpleOperator>${operator}</SimpleOperator>
                  <Value>${attributeValue}</Value>
                </Filter>
              </RetrieveRequest>
            </RetrieveRequestMsg>
          </soapenv:Body>
        </soapenv:Envelope>`;

      return axios.post(`${VITE_APP_URL}/proxy/https://${endpointSubdomain}.soap.marketingcloudapis.com/Service.asmx`, envelope, {
          headers: {
            'Content-Type': 'text/xml',
            SOAPAction: 'Retrieve'
          }
        }).then((response) => {
          const json = JSON.parse(xml2json.xml2json(response.data, { compact: true }));
          const result = json['soap:Envelope']['soap:Body'].RetrieveResponseMsg;

          return this.formatResponseSOAP(result);
        });
    },
    async dataExtensionFieldSearch (accessToken, endpointSubdomain, deCustomerKey) {
      const envelope = `
        <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
          <soapenv:Header>
            <fueloauth xmlns="http://exacttarget.com">${accessToken}</fueloauth>
          </soapenv:Header>
          <soapenv:Body>
            <RetrieveRequestMsg xmlns="http://exacttarget.com/wsdl/partnerAPI">
              <RetrieveRequest>
                <ObjectType>DataExtensionField</ObjectType>
                <Properties>Name</Properties>
                <Properties>FieldType</Properties>
                <Properties>IsRequired</Properties>
                <Filter xsi:type="SimpleFilterPart">
                  <Property>DataExtension.CustomerKey</Property>
                  <SimpleOperator>equals</SimpleOperator>
                  <Value>${deCustomerKey}</Value>
                </Filter>
              </RetrieveRequest>
            </RetrieveRequestMsg>
          </soapenv:Body>
        </soapenv:Envelope>`;

      return axios.post(`${VITE_APP_URL}/proxy/https://${endpointSubdomain}.soap.marketingcloudapis.com/Service.asmx`, envelope, {
          headers: {
            'Content-Type': 'text/xml',
            SOAPAction: 'Retrieve'
          }
        }).then((res) => {
          const json = JSON.parse(xml2json.xml2json(res.data, { compact: true }));
          const result = json['soap:Envelope']['soap:Body'].RetrieveResponseMsg;

          return this.formatResponseSOAP(result);
        });
    },
    formatResponseSOAP (soapData) {
      const results = []
  
      if (soapData.OverallStatus._text === 'OK' && soapData.Results) {
        let soapResults = []
  
        if (soapData.Results instanceof Array) {
          soapResults = soapData.Results;
        } else {
          soapResults.push(soapData.Results);
        }
  
        soapResults.forEach((aResult) => {
          const aFormattedResult = {}
          Object.keys(aResult).forEach((aResultField) => {
            aFormattedResult[aResultField] = aResult[aResultField]._text
          });
          results.push(aFormattedResult);
        });
  
        this.$log.debug(`(SOAP CALL) Response ${JSON.stringify(results)}`);
      }
  
      return results;
    },
    async eventDefinitionSearch (accessToken, endpointBase, searchTerm) {
      return axios.get(`${VITE_APP_URL}/proxy/${endpointBase}/interaction/v1/eventDefinitions?name=${searchTerm}&mode=1&type=APIEvent`, { headers: { Authorization: `Bearer ${accessToken}` } })
        .then((response) => {
          var responseItems = response.data.items;
          var validItems = []

          for (let i = 0; i < responseItems.length; i++) {
            if (!responseItems[i].dataExtensionName.startsWith('___')) {
              validItems.push({
                id: responseItems[i].id,
                name: responseItems[i].name,
                eventDefinitionKey: responseItems[i].eventDefinitionKey,
                dataExtensionName: responseItems[i].dataExtensionName
              });
            }
          }

          return validItems;
        });
    }
  }
}
