#!/usr/bin/env python


# coding: utf-8

# In[1]:

import numpy as np
import pandas as pd
import warnings
warnings.filterwarnings('ignore')


# In[2]:

def ts(x):
    print(type(x))
    print(np.shape(x))


# In[3]:

calls_raw = pd.read_csv(r'calls_ml.csv')
incidents_raw = pd.read_csv(r'incidents_ml.csv')



# In[7]:

x_columns_calls = ['ORIGINAL_CRIME_TYPE_NAME','TIME','MONTH']
x_columns_incidents = ['CTGRY','DAYOFWEEK','PDDISTRICT','MONTH','TIME']
calls_x = calls_raw[x_columns_calls]
incidents_x = incidents_raw[x_columns_incidents]

calls_y = calls_raw["COUNT(*)"]
incidents_y = incidents_raw["COUNT(*)"]


# In[9]:

from sklearn import preprocessing


# In[10]:

calls_label_encoder_lst = []
incidents_label_encoder_lst = []
calls_x_encd = calls_x.copy()
incidents_x_encd = incidents_x.copy()

le_ORIGINAL_CRIME_TYPE_NAME = preprocessing.LabelEncoder()
le_CTGRY = preprocessing.LabelEncoder()
le_DAYOFWEEK = preprocessing.LabelEncoder()
le_PDDISTRICT = preprocessing.LabelEncoder()
le_TIME = preprocessing.LabelEncoder()
le_MONTH = preprocessing.LabelEncoder()

le_ORIGINAL_CRIME_TYPE_NAME.fit(calls_x['ORIGINAL_CRIME_TYPE_NAME'])
le_CTGRY.fit(incidents_x['CTGRY'])
le_DAYOFWEEK.fit(incidents_x['DAYOFWEEK'])
le_PDDISTRICT.fit(incidents_x['PDDISTRICT'])
#le_TIME.fit(incidents_x['TIME'])
#le_MONTH.fit(incidents_x['MONTH'])

calls_x_encd['ORIGINAL_CRIME_TYPE_NAME'] = le_ORIGINAL_CRIME_TYPE_NAME.transform(calls_x['ORIGINAL_CRIME_TYPE_NAME'])
#calls_x_encd['TIME'] = le_TIME.transform(calls_x['TIME'])
#calls_x_encd['MONTH'] = le_MONTH.transform(calls_x['MONTH'])

incidents_x_encd['CTGRY'] = le_CTGRY.transform(incidents_x['CTGRY'])
incidents_x_encd['DAYOFWEEK'] = le_DAYOFWEEK.transform(incidents_x['DAYOFWEEK'])
incidents_x_encd['PDDISTRICT'] = le_PDDISTRICT.transform(incidents_x['PDDISTRICT'])
#incidents_x_encd['MONTH'] = le_MONTH.transform(incidents_x['MONTH'])
#incidents_x_encd['TIME'] = le_TIME.transform(incidents_x['TIME'])




# In[12]:

from sklearn.externals import joblib
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error

def train_test_model(X, y, yNname):
    reg = LinearRegression()
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)
    reg.fit(X_train, y_train)
    #print("----------------------------------------")
    #print("Rate for {}".format(yNname))
    #print("Training MSE: {}".format(mean_squared_error(y_train, reg.predict(X_train))))
    #print("Testing  MSE: {}".format(mean_squared_error(y_test, reg.predict(X_test))))
    joblib.dump(reg, yNname + '.pkl')
    
train_test_model(calls_x_encd, calls_y, 'calls')
train_test_model(incidents_x_encd, incidents_y, 'incidents')   

def get_quote(X, yNname):
    reg = joblib.load(yNname+'.pkl')
    return reg.predict(X)


# In[13]:

'''
# calls
ip_calls_ORIGINAL_CRIME_TYPE_NAME = 'Traffic Stop'
ip_calls_TIME = 21
ip_calls_MONTH = 12

# incidents
ip_incidents_CTGRY = 'MISSING PERSON'
ip_incidents_DAYOFWEEK = 'Saturday'
ip_incidents_PDDISTRICT = 'BAYVIEW'
ip_incidents_MONTH = 5
ip_incidents_TIME = 14
'''
import sys
ip_calls_ORIGINAL_CRIME_TYPE_NAME = sys.argv[1]
ip_calls_TIME = sys.argv[2]
ip_calls_MONTH = sys.argv[3]
ip_incidents_CTGRY = sys.argv[4]
ip_incidents_DAYOFWEEK = sys.argv[5]
ip_incidents_PDDISTRICT = sys.argv[6]
ip_incidents_MONTH = sys.argv[7]
ip_incidents_TIME = sys.argv[8]
ip_flag = sys.argv[9]


# In[14]:


if ip_flag == "calls":
    #print(ip_flag)
    input_calls_x = pd.DataFrame([[ip_calls_ORIGINAL_CRIME_TYPE_NAME, ip_calls_TIME, ip_calls_MONTH]])
    input_calls_x.columns = x_columns_calls
    input_calls_x_encoded = input_calls_x.copy()
    input_calls_x_encoded['ORIGINAL_CRIME_TYPE_NAME'] = le_ORIGINAL_CRIME_TYPE_NAME.transform(input_calls_x['ORIGINAL_CRIME_TYPE_NAME'])
    #input_calls_x_encoded['TIME'] = le_TIME.transform(input_calls_x['TIME'])
    #input_calls_x_encoded['MONTH'] = le_MONTH.transform(input_calls_x['MONTH'])
    print("Estimated number of Calls: {}".format(int(get_quote(input_calls_x_encoded,'calls')[0])))


if ip_flag == "incidents":
    #print(ip_flag)
    input_incidents_x = pd.DataFrame([[ip_incidents_CTGRY, ip_incidents_DAYOFWEEK, ip_incidents_PDDISTRICT,
                                      ip_incidents_MONTH,ip_incidents_TIME]])
    input_incidents_x.columns = x_columns_incidents
    
    input_incidents_x_encoded = input_incidents_x.copy()
    
    input_incidents_x_encoded['CTGRY'] = le_CTGRY.transform(input_incidents_x['CTGRY'])
    input_incidents_x_encoded['DAYOFWEEK'] = le_DAYOFWEEK.transform(input_incidents_x['DAYOFWEEK'])
    input_incidents_x_encoded['PDDISTRICT'] = le_PDDISTRICT.transform(input_incidents_x['PDDISTRICT'])
    #incidents_x_encd['MONTH'] = le_MONTH.transform(input_incidents_x['MONTH'])
    #incidents_x_encd['TIME'] = le_TIME.transform(input_incidents_x['TIME'])
    print("Estimated number of Incidents: {}".format(int(get_quote(input_incidents_x_encoded,'incidents')[0])))




