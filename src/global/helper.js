import { generatePath } from 'react-router';
import dayjs from "dayjs";
import QueryString from 'query-string';
import {ACCOUNT_NAME, CACHE_KEY} from './constant';


export const createURL = (pattern, params, query) => {
  let path = generatePath(pattern, params);
  if (query) {
    const queryString = QueryString.stringify(query);
    path = `${path}?${queryString}`;
  }
  return path;
};

export const convertMemory = (inputMemory) => {
  let convertedMemory = 0;
  let unit = '';
  if (inputMemory > 1024) { // convert bytes into KB
    convertedMemory = inputMemory / 1024;
    unit = 'KB';
  }
  if (convertedMemory > 1024) { // convert KB into MB
    convertedMemory = convertedMemory / 1024;
    unit = 'MB';
  }
  if (convertedMemory > 1024) { // convert MB into GB
    convertedMemory = convertedMemory / 1024;
    unit = 'GB';
  }
  return `${Math.round(convertedMemory * 100) / 100} ${unit}`;
};

export const validateWallet = (wallet) => {
  const onlyChars = /^[a-z1-5.]*$/;
  console.log(':: wallet ', wallet)
  console.log(':: onlyChars.test(wallet) ', onlyChars.test(wallet))
  return !!(wallet !==null && wallet !== '' && onlyChars.test(wallet) && wallet.length<=12)
}

export const sanitizeWallet = (wallet) => {
    return wallet?.replace(/%20/g, ' ')?.trim()?.toLowerCase();
}

export const setWalletLocalStorage = (wallet) => {
  localStorage.setItem(CACHE_KEY.WALLET, wallet);
};

export const getWalletLocalStorage = () => {
  return localStorage.getItem(CACHE_KEY.WALLET) ?? '';
};

export const clearFromLocalStorage = (storageKey,itemsToRemove) => {
    let data = getSubscriberFromLocalStorage(storageKey)
    itemsToRemove.forEach(item => {
        const index = data.indexOf(item);
        if (index !== -1) {
            data.splice(data.indexOf(item), 1);
        }
    })
    setSubscriberInLocalStorage(data)
}

export const setSubscriberInLocalStorage = (list) => {
  localStorage.setItem(CACHE_KEY.SUBSCRIBER, JSON.stringify({[CACHE_KEY.SUBSCRIBER]: list}));
};

export const getSubscriberFromLocalStorage = (key) => {
  const data = localStorage.getItem(key);
  if (data && data !== '') {
    return JSON.parse(data)[key];
  }
  return [];
};

export const handleSubscriberFilter = (subscriberList) => {
  const existingUsers = [];
  const newUsers = [];
  subscriberList.forEach((datum) => {
      let stake = null;
      if (datum.stake) {
        if (typeof datum.stake === 'string') {
          stake = Number(datum.stake?.split(" ")[0]);
        } else {
          stake = datum.stake;
        }
      }
      const subscriber = {
          account: datum.account ?? null,
          stake,
          renewal: datum.renewal ? datum.renewal * 1000 : null
      }
      if (!!subscriber.account) {
          existingUsers.push(subscriber);
      } else {
          newUsers.push(subscriber);
      }
  });
  return {
      existingUsers,
      newUsers
  };
}

export const calculateNumberOfDays = (day1, day2) => {
  const date1 = dayjs(day1);
  const date2 = dayjs(day2);
  let hours = date2.diff(date1, 'hours');
  const days = Math.floor(hours / 24);
  hours = hours - (days * 24);
  return Math.round((days + (hours/24)) * 100) / 100;
}

export const sleep = (seconds) => {
    return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
};