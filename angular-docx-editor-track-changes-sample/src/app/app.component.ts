import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { ToolbarService, RibbonService, DocumentEditorContainerComponent, LayoutType, DocumentEditorContainerModule } from '@syncfusion/ej2-angular-documenteditor';
import { TitleBar } from './title-bar';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { createSpinner, showSpinner, hideSpinner } from '@syncfusion/ej2-angular-popups';
import { DropDownListComponent, DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';

let trackchanges = {"sfdt":"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"}


/**
 * Document Editor Component
 */
@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    encapsulation: ViewEncapsulation.None,
    providers: [ToolbarService, RibbonService],
    standalone: true,
    imports: [DocumentEditorContainerModule, DropDownListModule]
})
export class AppComponent {
    public hostUrl: string = 'https://document.syncfusion.com/web-services/docx-editor/api/documenteditor/';
    @ViewChild('documenteditor_default')
    public container!: DocumentEditorContainerComponent;
    
    @ViewChild('insertionDrop')
    public insertionDrop!: DropDownListComponent;
    @ViewChild('deletionDrop')
    public deletionDrop!: DropDownListComponent;
    @ViewChild('insertedRowsDrop')
    public insertedRowsDrop!: DropDownListComponent;
    @ViewChild('deletedRowsDrop')
    public deletedRowsDrop!: DropDownListComponent;

    public culture: string = 'en-US';
    titleBar!: TitleBar;
    layoutType: LayoutType = "Continuous";
    isApplyDisabled: boolean = true;

    // Track Changes revision color dropdown data
    public revisionColorData: { Text: string; Value: string }[] = [
        { Text: 'By author', Value: 'byAuthor' },
        { Text: 'Blue', Value: '#0000FF' },
        { Text: 'Red', Value: '#FF0000' },
        { Text: 'Pink', Value: '#FFC0CB' },
        { Text: 'Yellow', Value: '#FFFF00' }
    ];

    public fields = { text: 'Text', value: 'Value' };

    public fileMenuItems: any = [
        'New',
        'Open',
        {
            text: 'Export',
            id: 'custom_item',
            iconCss: 'e-icons e-export',
            items: [
                { id: 'sfdt', text: 'Syncfusion Document Text (*.sfdt)' },
                { id: 'docx', text: 'Word Document (*.docx)' },
                { id: 'dotx', text: 'Word Template (*.dotx)' },
                { id: 'text', text: 'Plain Text (*.txt)' },
                { id: 'pdf', text: 'PDF (*.pdf)' },
                { id: 'html', text: 'HyperText Markup Language (*.html)' },
                { id: 'rtf', text: 'Rich Text Format (*.rtf)' },
                { id: 'md', text: 'Markdown (*.md)' },
                { id: 'odt', text: 'OpenDocument Text (*.odt)' },
                { id: 'wordml', text: 'Word XML Document (*.xml)' }
            ],
        },
        'Print',
    ];

    

    public fileMenuItemClick(args: any): void {
        if (args.item.id) {
            let value: string = args.item.id;
            switch (value) {
                case 'docx':
                this.container.documentEditor.save('Sample', 'Docx');
                break;
                case 'sfdt':
                this.container.documentEditor.save('Sample', 'Sfdt');
                break;
                case 'text':
                this.container.documentEditor.save('Sample', 'Txt');
                break;
                case 'dotx':
                this.container.documentEditor.save('Sample', 'Dotx');
                break;
                case 'pdf':
                this.formatSave('Pdf');
                break;
                case 'html':
                this.formatSave('Html');
                break;
                case 'odt':
                this.formatSave('Odt');
                break;
                case 'md':
                this.formatSave('Md');
                break;
                case 'rtf':
                this.formatSave('Rtf');
                break;
                case 'wordml':
                this.formatSave('Xml');
                break;
            }
        }
    }

    public formatSave(type: string): void {
        let containerElement = document.getElementById('container');
        if (!containerElement) {
            console.error('Container element not found');
            return;
        }

        createSpinner({
            target: containerElement,
        });
        showSpinner(containerElement);
        let format: string = type;
        let url = this.container.documentEditor.serviceUrl + 'Export';
        let http = new XMLHttpRequest();
        http.open('POST', url);
        http.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
        http.responseType = 'blob'; // Set the responseType to 'blob' to handle binary data

        // Prepare data to send
        let sfdt = {
            Content: this.container.documentEditor.serialize(),
            Filename: this.container.documentEditor.documentName,
            Format: '.' + format,
        };

        // Set up event listener for the response
        http.onload = () => {
            if (http.status === 200) {
                // Handle the response blob here
                let responseData = http.response;

                // Create a Blob URL for the response data
                let blobUrl = URL.createObjectURL(responseData);

                // Create a link element and trigger the download
                let downloadLink = document.createElement('a');
                downloadLink.href = blobUrl;
                downloadLink.download = this.container.documentEditor.documentName + '.' + format.toLowerCase();
                document.body.appendChild(downloadLink);
                hideSpinner(containerElement!);
                downloadLink.click();

                // Cleanup: Remove the link and revoke the Blob URL
                document.body.removeChild(downloadLink);
                URL.revokeObjectURL(blobUrl);
            } else {
                // Handle errors
                console.error('Request failed with status:', http.status);
                hideSpinner(containerElement!);
            }
        };

        // Send the request with JSON.stringify(sfdt) as the request body
        http.send(JSON.stringify(sfdt));
    }

    onCreate(): void {
        let titleBarElement = document.getElementById('default_title_bar');
        if (titleBarElement) {
            this.titleBar = new TitleBar(titleBarElement, this.container.documentEditor, true);
            this.container.documentEditor.open(JSON.stringify(trackchanges));
            this.container.documentEditor.documentName = 'Track Changes';
            this.container.documentEditorSettings.showRuler = true;
            this.titleBar.updateDocumentTitle();
            this.titleBar.showButtons(false);
        }
    }
    onDocumentChange(): void {
        if (!isNullOrUndefined(this.titleBar)) {
            this.titleBar.updateDocumentTitle();
        }
       this.container.documentEditor.focusIn();
    }

    onColorChange(): void {
        this.isApplyDisabled = false;
    }

    onApply(): void {
        if (this.container != null) {
            this.container.documentEditorSettings.revisionSettings = {
                insertRevisionColor: (this.insertionDrop && this.insertionDrop.value) as string,
                deleteRevisionColor: (this.deletionDrop && this.deletionDrop.value) as string,
                insertedRowColor: (this.insertedRowsDrop && this.insertedRowsDrop.value) as string,
                deletedRowColor: (this.deletedRowsDrop && this.deletedRowsDrop.value) as string
            };
            this.isApplyDisabled = true;
        }
    }
}
