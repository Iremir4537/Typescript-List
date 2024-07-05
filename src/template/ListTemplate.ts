import FullList from "../model/FullList";

interface DOMList {
    ul: HTMLUListElement,
    clear(): void,
    render(fullList: FullList):void; 
}

export default class ListTemplate implements DOMList{

    ul: HTMLUListElement
    static instance: ListTemplate = new ListTemplate();

    private constructor(){
        this.ul = document.getElementById('listItems') as HTMLUListElement
    }

    clear(): void {
        this.ul.innerHTML = ''
    }

    render(fullList: FullList): void {
        this.clear()
        
        fullList.list.forEach(item =>{
            const li = document.createElement('li') as HTMLLIElement
            li.className = 'item'

            const checked = document.createElement('input') as HTMLInputElement
            checked.type = 'checkbox'
            checked.id = item.id
            checked.tabIndex = 0
            checked.checked = item.checked
            li.append(checked)

            checked.addEventListener('change', () => {
                item.checked = !item.checked
                fullList.save()
            })

            const label = document.createElement('label') as HTMLLabelElement
            label.htmlFor = item.id
            label.textContent = item.item
            li.append(label)

            const button = document.createElement('button') as HTMLButtonElement
            button.className = 'button'
            button.textContent = 'X'
            li.append(button)

            button.addEventListener('click', () => {
                fullList.removeItem(item.id)
                this.render(fullList)
            })

            this.ul.append(li)
        })
            
        
    }

}