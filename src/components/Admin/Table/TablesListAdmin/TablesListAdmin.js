import React, { useState, useEffect } from 'react'
import { Button, Icon, Checkbox,Label } from "semantic-ui-react"
import { map } from "lodash"
import { TableAdmin } from "../"
import "./TablesListAdmin.scss";

export function TablesListAdmin(props) {
    const { tables } = props;
    const [reload, setReload] = useState(false);
    const [autoReload, setAutoReload] = useState(false);

    const onReload = () => setReload((prev) => !prev);

    useEffect(() => {
        if(autoReload) {
            const autoReloadAction = () => {
                onReload()
                setTimeout(() => {
                    autoReloadAction()
                }, 2000)
            }
            autoReloadAction();
        }
    }, [autoReload]);

    const onCheckAutoReload = (check) => {
        if(check) {
            setAutoReload(check)            
        } else {
            window.location.reload();
        }
    }

    return (

        <div className='tables-list-admin'>

            <div>
            <Button 
                primary 
                icon 
                className='tables-list-admin__reload' 
                onClick={onReload}
                >
                  <Icon name='refresh' />
            </Button>
            </div>
            <div className='tables-list-admin__reload-toggle'>
                <span>Refrescar automáticamente</span>
                <Checkbox 
                    toggle 
                    checked={autoReload} 
                    onChange={(_, data) => onCheckAutoReload(data.checked)} />
            </div>
            

            {map(tables, (table) => (
                <TableAdmin key={table.number} table={table} reload={reload} />
            ))}
        </div>
    )
}
