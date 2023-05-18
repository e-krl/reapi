import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import CodeMirror from '@uiw/react-codemirror';
import axios from 'axios';
import DropdownSelector from './components/DropdownSelector';
import Section from './components/Section';
import HamburgerButton from './components/HamButton';
import LoadingIndicator from './components/LoadingIndicator';
import SavedCallsDialog from './components/SavedCallsDialog';


function App() {
  const [tab, setTab] = useState('params');
  const [key, setKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [callName, setCallName] = useState("untitled");
  const [value, setValue] = useState('');
  const [apiUrl, setApiUrl] = useState('');

  const [openCallDialogShow, setOpenCallDialogShow] = useState(false);
  const [isHamMenuShow, setIsHamMenuShow] = useState(false);

  const [code, setCode] = useState('{}');
  const [output, setOutput] = useState("Output");
  const [params, setParams] = useState({});
  const [headers, setHeaders] = useState({
    'Content-Type': 'application/json'
  });
  const [auth, setAuth] = useState({});
  const [data, setData] = React.useState({});

  const [selectedOption, setSelectedOption] = useState('post');
  const [time, setTime] = useState(0);

  let startTime;

  function postRequest() {
    try {
      setIsLoading(true);

      const config = {
        headers,
        params,
        auth
      };

      console.log("apiUrl:",apiUrl);
      console.log("data:",data);
      console.log("config:",config);

      startTime = Date.now();

      axios.post(
        apiUrl,
        data,
        config
      ).then((res)=>{
        setTime(Date.now() - startTime);
        setIsLoading(false);
        console.log(res.data);
        setOutput(JSON.stringify(res.data,null, 2));
      }).catch((err)=>{
        setTime(Date.now() - startTime);
        setIsLoading(false);
        alert(err);
      });

    } catch (err) {
      setTime(Date.now() - startTime);
      setIsLoading(false);
      alert(err);
    }
  }

  function getRequest() {
    try {
      setIsLoading(true);

      const config = {
        headers,
        params,
        auth
      };

      console.log("apiUrl:",apiUrl);
      console.log("data:",data);
      console.log("config:",config);

      startTime = Date.now();

      axios.get(
        apiUrl,
        config
      ).then((res)=>{
        setTime(Date.now() - startTime);
        setIsLoading(false);
        console.log(res.data);
        setOutput(JSON.stringify(res.data,null, 2));
      }).catch((err)=>{
        setTime(Date.now() - startTime);
        setIsLoading(false);
        alert(err);
      });

    } catch (err) {
      setTime(Date.now() - startTime);
      setIsLoading(false);
      alert(err);
    }
  }

  function deleteRequest() {
    try {
      setIsLoading(true);

      const config = {
        headers,
        params,
        auth
      };

      console.log("apiUrl:",apiUrl);
      console.log("data:",data);
      console.log("config:",config);

      startTime = Date.now();

      axios.delete(
        apiUrl,
        config
      ).then((res)=>{
        setTime(Date.now() - startTime);
        setIsLoading(false);
        console.log(res.data);
        setOutput(JSON.stringify(res.data,null, 2));
      }).catch((err)=>{
        setTime(Date.now() - startTime);
        setIsLoading(false);
        alert(err);
      });

    } catch (err) {
      setTime(Date.now() - startTime);
      setIsLoading(false);
      alert(err);
    }
  }

  const handleTabChange = (sectionId) => {
    setTab(sectionId);
  };

  const handleCallNameChange = (event) => {
    setCallName(event.target.value);
  }

  const handleKeyChange = (event) => {
    setKey(event.target.value);
  };

  const handleValueChange = (event) => {
    setValue(event.target.value);
  };

  const handleApiUrlChange = (event) => {
    setApiUrl(event.target.value);
  };

  const handleSelectedOption = (selectedOption) => {
    console.log('Selected option:', selectedOption);
    setSelectedOption(selectedOption);
  };

  const onChange = React.useCallback((value, viewUpdate) => {
    try{
      setData(JSON.parse(value));
    } catch {
      console.log("can't parse")
    }
  }, []);

  function send(){
    if(selectedOption == "post"){
      postRequest();
      console.log(data);
    }
    if(selectedOption == "get"){
      getRequest();
      console.log(data);
    }
    if(selectedOption == "delete"){
      deleteRequest();
      console.log(data);
    }
  }

  const addParams = () => {
    setParams({...params, [key]:value});
  };

  const delParams = (key) => {
    const updatedData = { ...params };
    delete updatedData[key];
    setParams(updatedData);
  };

  const addHeaders = () => {
    setHeaders({...headers, [key]:value});
  };
  
  const addAuth = () => {
    setAuth({...auth, [key]:value});
  };

  const handleSave = () => {
    if (callName in localStorage) {
      alert('Call exist!');
    } else {

      const d = {
        params: params,
        auth: auth,
        headers: headers,
        body: data
      }

      localStorage.setItem(callName,JSON.stringify(d,null,2));
      alert('Call saved.');

    }
  };


  
  const openSavedCall = (callName="exit") => {
    if(callName == "exit"){
      setOpenCallDialogShow(false);
    } else {
      const d = JSON.parse(localStorage.getItem(callName));
      setParams(d.params);
      setAuth(d.auth);
      setHeaders(d.headers);
      setData(d.body);
      setOpenCallDialogShow(false);
    }
  }

  const handleOpenCallDialogShow = () => {
    setOpenCallDialogShow(true);
  }

  const handleDeleteCall = (key) => {
    localStorage.removeItem(key);
  }

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="rounded-lg bg-white shadow-md p-8 w-full max-w-4xl max-h-4xl">
 
      <header className="bg-gray-100 py-4 px-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-red-500">REAPI</h1>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <label htmlFor="callName" style={{ marginRight: '0.5rem' }}>Request Name:</label>
          <input
            type="text"
            id="callName"
            value={callName}
            onChange={handleCallNameChange}
            style={{ width: `${callName.length < 8 ? 8 : callName.length}ch`, border: 'none', borderRadius: '5px', outline: 'none', background: 'white', textAlign: 'center' }}
          />
        </div>
        <HamburgerButton handleOpen={handleOpenCallDialogShow} handleSave={handleSave}/>
      </header>

    <div className="bg-gray-100">
      <div className="container mx-auto p-4">
        <div className="flex items-center mb-4">
          {openCallDialogShow && <SavedCallsDialog handleOpen={openSavedCall} handleDeleteCall={handleDeleteCall} />}
          <DropdownSelector onSelect={handleSelectedOption} />
          <input
            type="text"
            className="px-2 py-1 mr-2 border border-gray-300 rounded"
            placeholder="Url"
            onChange={handleApiUrlChange}
          />
          <button
            className="px-4 py-1 bg-blue-500 text-white rounded"
            onClick={send}
          >
            Send
          </button>
        </div>

        <div className="flex">
          <div className="w-1/4">
            <ul className="flex flex-col mb-4">
              <li
                className={`px-4 py-2 border-b border-gray-300 cursor-pointer ${
                  tab === 'params' ? 'active' : ''
                }`}
                onClick={() => handleTabChange('params')}
              >
                Params
              </li>
              <li
                className={`px-4 py-2 border-b border-gray-300 cursor-pointer ${
                  tab === 'auth' ? 'active' : ''
                }`}
                onClick={() => handleTabChange('auth')}
              >
                Auth
              </li>
              <li
                className={`px-4 py-2 border-b border-gray-300 cursor-pointer ${
                  tab === 'headers' ? 'active' : ''
                }`}
                onClick={() => handleTabChange('headers')}
              >
                Headers
              </li>
              <li
                className={`px-4 py-2 border-b border-gray-300 cursor-pointer ${
                  tab === 'body' ? 'active' : ''
                }`}
                onClick={() => handleTabChange('body')}
              >
                Body
              </li>
            </ul>
          </div>
          <div className="w-3/4 pl-4">
                {tab == 'params' ? 
                <Section 
                  data={params}
                  handleKeyChange={handleKeyChange}
                  handleValueChange={handleValueChange}
                  section={'params'}
                  add={addParams}
                  del={delParams}
                /> : "" }
                {tab == 'auth' ? 
                <Section 
                  data={auth}
                  handleKeyChange={handleKeyChange}
                  handleValueChange={handleValueChange}
                  section={'auth'}
                  add={addAuth}
                /> : "" }                
                {tab == 'headers' ? 
                <Section 
                  data={headers}
                  handleKeyChange={handleKeyChange}
                  handleValueChange={handleValueChange}
                  section={'headers'}
                  add={addHeaders}
                /> : "" }
            <div
              id="body"
              className={`mb-4 ${tab === 'body' ? '' : 'hidden'}`}
            >
              <h2 className="font-bold mb-2">Body</h2>
                 <CodeMirror
                  value={JSON.stringify(data,null,2)}
                  height="200px"
                  onChange={onChange}
                />
            </div>
          </div>
        </div>
        <div className="mt-4" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <h2 className="font-bold mb-2">Output</h2>
          <h4>{time} ms</h4>
          <pre className="border border-gray-300 p-2 bg-white rounded" style={{ flex: '1 1 auto', overflow: 'auto' }}>
            {isLoading ? <LoadingIndicator isPage={false} /> : output }
          </pre>
        </div>
      </div>
    </div>
    </div>
    </div>
  );
}

export default App;
