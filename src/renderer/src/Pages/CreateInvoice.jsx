import { useContext, useState, useEffect } from "react";
import { GlobalContext } from "../GlobalContext.jsx";
import InvoiceDiv from "../components/Invoice/InvoiceDiv.jsx";
import ProductRow from "../components/Invoice/ProductRow.jsx";

const CreateInvoice = () => {
  const context = useContext(GlobalContext); 
  
  const [seller, setSeller] = useState(context.settings.find(setting => setting.key === "seller").value);
  const [bankInfo, setBankInfo] = useState(context.settings.find(setting => setting.key === "banks").value);

  const bankArray = bankInfo.split(",").map(bank => {
    const [key, value] = bank.split("-");
    return { key, value };
  });

  const [invoiceNum, setInvoiceNum] = useState(context.settings.find(setting => setting.key === "next_invoice_number").value);
  const currentYear = new Date().getFullYear();
  const invoiceNumString = `${currentYear}-${invoiceNum}`;


  const currentDate = new Date();
  const day = String(currentDate.getDate()).padStart(2, '0'); // Adds leading zero if day is less than 10
  const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Adds leading zero if month is less than 10
  const year = currentDate.getFullYear();
  const formattedDate = `${day} / ${month} / ${year}`;

  const [address, setAddress] = useState(context.settings.find(setting => setting.key === "address").value);
  const [NRF, setNRF] = useState(context.settings.find(setting => setting.key === "NRF").value);
  const [TVSH, setTVSH] = useState(context.settings.find(setting => setting.key === "TVSH").value);
  const [contact, setContact] = useState(context.settings.find(setting => setting.key === "contact_number").value);
  const [email, setEmail] = useState(context.settings.find(setting => setting.key === "email").value);

  return (
      // Div that is set to a4 aspect ration
      <InvoiceDiv>
        
        {/* Div that will hold all the contents. FlexCol */}
        <div className='mt-4 w-full h-full p-0 flex flex-col'>

        {/* Header/Logo DIV */}
          <div className='mb-[40px] w-full h-auto text-center text-6xl uppercase'>
            <b>{seller}</b>
          </div> 

          {/* Seller/Customer Info */}
          <div className='w-full h-[15%] flex flex-row items-center'>
            <div className='h-[95%] w-[50%] flex flex-col'>
              <div className='text-l pl-1 w-[90%]'>
                <b><div className='flex flex-row justify-between'><inline className="uppercase">Shitësi</inline> <inline className="text-black">{seller}</inline> </div></b>
              </div>
              
              <hr className="border-t-4 w-[90%] border-gray-300"></hr>
              <div className='h-auto w-[90%] flex flex-col w-[90%] pl-2 pr-2 text-sm'>
                <b><div className='flex flex-row justify-between'><inline className="uppercase">Adresa</inline> <inline className="text-black">{address}</inline> </div></b>
                <b><div className='flex flex-row justify-between'><inline className="uppercase">NRF</inline> <inline className="text-black">{NRF}</inline> </div></b>
                <b><div className='flex flex-row justify-between'><inline className="uppercase">TVSH</inline> <inline className="text-black">{TVSH}</inline> </div></b>
                <b><div className='flex flex-row justify-between'><inline className="uppercase">Contact</inline> <inline className="text-black">{contact}</inline> </div></b>
                <b><div className='flex flex-row justify-between'><inline className="uppercase">E-Mail</inline> <inline className="text-black">{email}</inline> </div></b>
              </div>
            </div>

            <div className='h-[95%] w-[50%] flex flex-col'>
              <div className='text-l pr-1 w-[90%] ml-auto'>
                <b><div className='flex flex-row justify-between'><inline className="uppercase">Blerësi</inline> <inline className="text-black">{seller}</inline> </div></b>
              </div>
              
              <hr className="border-t-4 w-[90%] border-gray-300 ml-auto"></hr>
              <div className='h-auto w-[90%] flex flex-col w-[90%] pl-2 pr-2 text-sm ml-auto'>
                <b><div className='flex flex-row justify-between'><inline className="uppercase">Adresa</inline> <inline className="text-black">{address}</inline> </div></b>
                <b><div className='flex flex-row justify-between'><inline className="uppercase">NRF</inline> <inline className="text-black">{NRF}</inline> </div></b>
                <b><div className='flex flex-row justify-between'><inline className="uppercase">TVSH</inline> <inline className="text-black">{TVSH}</inline> </div></b>
                <b><div className='flex flex-row justify-between'><inline className="uppercase">Contact</inline> <inline className="text-black">{contact}</inline> </div></b>
                <b><div className='flex flex-row justify-between'><inline className="uppercase">E-Mail</inline> <inline className="text-black">{email}</inline> </div></b>
              </div>
            </div>
          </div>

          {/* Bank info and invoice info DIV */}
          <div className='w-full h-[15%] flex flex-row items-center text-sm'>
            
            {/* Bank info DIV */}
            <div className='h-[95%] w-[50%] flex flex-col'>
                <div className='text-l uppercase pl-1'><b>Llogaritë Bankare</b></div>
                <hr className="border-t-4 w-[90%] border-gray-300"></hr>
                <div className='h-auto w-[90%] flex flex-col w-[90%] pl-2 pr-2'>
                  {bankArray.map(bank => (
                    <b><div className='flex flex-row justify-between'key={bank.key}> <inline>{bank.key}</inline> <inline className="text-black">{bank.value}</inline></div></b>
                  ))}
                </div>
            </div>

            {/* Invoice info DIV */}
            <div className='mt-auto w-[50%] flex flex-col'>
                <div className='text-l uppercase pr-1 text-right'><b>Faturë Shitje</b></div>
                <hr className="border-t-4 w-[60%] ml-auto border-gray-300"></hr>
                <div className='h-auto w-[60%] flex flex-col w-[90%] ml-auto pl-2 pr-2'>
                  <b><div className='flex flex-row justify-between uppercase'><inline>Nr. i faturës</inline> <inline className="text-black">{invoiceNumString}</inline> </div></b>
                  <b><div className='flex flex-row justify-between uppercase'><inline>Data</inline> <inline className="text-black">{formattedDate}</inline> </div></b>
                </div>
              </div>
              
          </div>

          {/* Products/Items Table */}
          <div className='w-full h-auto align-center'>
              <table className='w-full'>
                <thead>
                  <tr className="font-roboto leading-[1.2] h-[50px] bg-gray-800 text-sm text-white">
                    <th className="border-r border-gray-700 w-[3%] rounded-tl-sm">Nr</th>
                    <th className="border-r border-gray-700 w-[34%]">Produkti</th>
                    <th className="border-r border-gray-700 w-[6%]">Njësia</th>
                    <th className="border-r border-gray-700 w-[6%]">Sasia</th>
                    <th className="border-r border-gray-700 w-[9%]">Çmimi <br/> me TVSH</th>
                    <th className="border-r border-gray-700 w-[9%]">Çmimi <br/> pa TVSH</th>
                    <th className="border-r border-gray-700 w-auto">Vlera <br/> pa TVSH</th>
                    <th className='border-r border-gray-700 w-[6%]'>%</th>
                    <th className='border-r border-gray-700 w-[9%]'>TVSH</th>
                    <th className="w-[9%] rounded-tr-sm">Vlera <br/> me TVSH</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Product row */}
                  <ProductRow productRow={{nr:"1",
                              produkti:"Product Name",
                              njesia:"kg",
                              sasia:"25",
                              cmimi:"14 €",
                              cmimiPaTVSH:"12.5 €",
                              vleraPaTVSH:"12.5 €",
                              percent:"18%",
                              TVSH:"1.50 €",
                              vlera:"14 €"}}/>
                              <ProductRow productRow={{nr:"1",
                              produkti:"Product Name2",
                              njesia:"Thes",
                              sasia:"50",
                              cmimi:"50 €",
                              cmimiPaTVSH:"34.75 €",
                              vleraPaTVSH:"37.42 €",
                              percent:"18%",
                              TVSH:"1.50 €",
                              vlera:"14 €"}}/>
                              
                              
                  <tr className="h-[25px]">
                    <th colSpan={6}></th>
                    <th className="border-l border-r border-b" colSpan={3} >Vlera pa tvsh</th>
                    <th className="border-l border-r border-b">512</th>
                  </tr>
                  <tr className="h-[25px]">
                    <th colSpan={6}></th>
                    <th className="border-l border-r border-b" colSpan={3} >TVSH</th>
                    <th className="border-l border-r border-b">200</th>
                  </tr>
                  <tr className="h-[25px]">
                    <th colSpan={6}></th>
                    <th className="border-l border-r border-b" colSpan={3} >Totali per pagese</th>
                    <th className="border-l border-r border-b">50</th>
                  </tr>
                </tbody>
              </table>
          </div>

          {/* Normat Tatimore */}
          <div className="mt-auto w-[40%] h-auto">
            <table className='w-full text-center'>
              <thead>
                <tr className="font-roboto h-[30px] bg-gray-800 text-sm text-white">
                  <th className="border-r border-gray-700 rounded-tl-sm">Normat Tatimore</th>
                  <th className="border-r border-gray-700">Baza</th>
                  <th className="border-r border-gray-700">TVSH</th>
                  <th className="border-gray-700 rounded-tr-sm">Vlera</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border-l border-r border-b">TVSH e llogaritur 0%</td>
                  <td className="border-l border-r border-b">0.00</td>
                  <td className="border-l border-r border-b">0.00</td>
                  <td className="border-l border-r border-b">0.00</td>
                </tr>
                <tr>
                  <td className="border-l border-r border-b">TVSH e llogaritur 8%</td>
                  <td className="border-l border-r border-b">0.00</td>
                  <td className="border-l border-r border-b">0.00</td>
                  <td className="border-l border-r border-b">0.00</td>
                </tr>
                <tr>
                  <td className="border-l border-r border-b">TVSH e llogaritur 18%</td>
                  <td className="border-l border-r border-b">0.00</td>
                  <td className="border-l border-r border-b">0.00</td>
                  <td className="border-l border-r border-b">0.00</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Nenshkrimet */}
          <div className="mt-auto mb-10 w-full h-[40px] flex flex-row justify-between">
            <div class="text-center w-[50%]">
              <div class="border-t border-black w-[90%] mx-auto"></div>
              <p class="mt-1">Shitësi</p>
            </div>
            <div class="text-center w-[50%]">
              <div class="border-t border-black w-[90%] mx-auto"></div>
              <p class="mt-1">Blerësi</p>
            </div>
          </div>
        </div>
      </InvoiceDiv>
    );
}

export default CreateInvoice


