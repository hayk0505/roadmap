import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders, NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { routing } from "../app-routing.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        routing,
        BrowserModule,
        HttpClientModule,
        FormsModule,
    ],
    declarations: [],
    exports: [
        // Modules
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        // Providers, Components, directive, pipes
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})

export class SharedModule {
    static forRoot(): ModuleWithProviders<any> {
        return {
            ngModule: SharedModule,
            providers: [
                // Providers

            ]
        };
    }
}
