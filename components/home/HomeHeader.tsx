import React from 'react';
import { UserProfile } from '../../types';

const HomeHeader: React.FC<{ user: UserProfile }> = ({ user }) => (
    <div>
        <h2 className="text-2xl font-bold text-slate-900">Hello, {user.name.split(' ')[0]}</h2>
        <p className="text-slate-500">How are you feeling today?</p>
    </div>
);
export default HomeHeader;