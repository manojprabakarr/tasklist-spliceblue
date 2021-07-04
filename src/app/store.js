import { configureStore } from '@reduxjs/toolkit';

import Taskreducer from '../features/Taskslice';
import Userreducer from '../features/Userslice';

export default configureStore ({
    reducer:{
        user:Userreducer,
        task:Taskreducer
        
    }
})