import React from 'react'
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Search, Inject, Toolbar  } from '@syncfusion/ej2-react-grids'
import { employeesData, employeesGrid } from '../data/dummy'
import { Header } from '../components'

const Employees = () => {
  const editing = { allowDeleting: true, allowEditing: true };
  return (
    <div className='m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl'>
      <Header category="Page" title="Employees"/>
      <GridComponent
        dataSource={employeesData}
        allowPaging
        allowSorting
        toolbar={['Search']}
        width="auto"
        editSettings={editing}
        // pageSettings={{pageCount: 5}}      
      >
        <ColumnsDirective>
          {employeesGrid.map((item, index) => (
            <ColumnDirective key={index} {...item}/>
          ))}
        </ColumnsDirective>
        <Inject services={[Page, Search, Toolbar]}/>
      </GridComponent>
    </div>
  )
}

export default Employees