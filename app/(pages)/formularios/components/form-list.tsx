'use client';

import { promises as fs } from 'fs';
import path from 'path';

import { columns } from '../components/columns';
import { DataTable } from '../components/data-table';
import { useEffect, useState } from 'react';

export default function FormList() {
    const [tasks, setTasks] = useState([{
        id: 'Formulário 8782',
        title:
            "You can't compress the program without quantifying the open-source SSD pixel!",
        status: 'in progress',
        label: 'documentation',
        priority: 'medium',
    }]);

    useEffect(() => {
        const getTasks = async () => {
            //setTasks(data)
        };
        getTasks();
        return;
    }, [setTasks]);

    return (
        <div className="h-full flex-1 flex-col space-y-8 flex">
            <DataTable data={tasks} columns={columns} />
        </div>
    );
}
